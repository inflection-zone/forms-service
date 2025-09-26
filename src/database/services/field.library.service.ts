import {
    FieldLibraryCreateModel,
    FieldLibraryUpdateModel,
    FieldLibrarySearchFilters,
    FieldLibrarySearchResults,
    FieldLibraryResponseDto,
    FieldLibraryCategoryDto,
    FieldLibraryStatisticsDto,
} from '../../domain.types/field.library.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository, Like, In } from 'typeorm';
import { FieldLibrary } from '../models/field.library/field.library.model';
import { FieldLibraryMapper } from '../mappers/field.library.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';

export class FieldLibraryService extends BaseService {
    _fieldLibraryRepository: Repository<FieldLibrary> = Source.getRepository(FieldLibrary);

    // Field Library operations
    public create = async (createModel: FieldLibraryCreateModel): Promise<FieldLibraryResponseDto> => {
        try {
            const field = this._fieldLibraryRepository.create(
                FieldLibraryMapper.toCreateModel(createModel)
            );
            const record = await this._fieldLibraryRepository.save(field);
            return FieldLibraryMapper.toDto(record);
        } catch (error) {
            logger.error(`Error creating field library entry: ${error.message}`);
            throw ErrorHandler.throwInternalServerError(
                'Unable to create field library entry!',
                error
            );
        }
    };

    public getById = async (id: uuid): Promise<FieldLibraryResponseDto> => {
        try {
            const record = await this._fieldLibraryRepository.findOne({
                where: { id, DeletedAt: null }
            });

            if (!record) {
                ErrorHandler.throwNotFoundError('Field library entry not found!');
            }

            return FieldLibraryMapper.toDto(record);
        } catch (error) {
            logger.error(`Error getting field library entry by ID: ${error.message}`);
            throw error;
        }
    };

    public getByFieldId = async (fieldId: string): Promise<FieldLibraryResponseDto> => {
        try {
            const record = await this._fieldLibraryRepository.findOne({
                where: { FieldId: fieldId, DeletedAt: null, IsActive: true }
            });

            if (!record) {
                ErrorHandler.throwNotFoundError('Field library entry not found!');
            }

            return FieldLibraryMapper.toDto(record);
        } catch (error) {
            logger.error(`Error getting field library entry by field ID: ${error.message}`);
            throw error;
        }
    };

    public update = async (id: uuid, updateModel: FieldLibraryUpdateModel): Promise<FieldLibraryResponseDto> => {
        try {
            const existingRecord = await this._fieldLibraryRepository.findOne({
                where: { id, DeletedAt: null }
            });

            if (!existingRecord) {
                ErrorHandler.throwNotFoundError('Field library entry not found!');
            }

            const updateData = FieldLibraryMapper.toUpdateModel(updateModel);
            await this._fieldLibraryRepository.update(id, updateData);

            const updatedRecord = await this._fieldLibraryRepository.findOne({
                where: { id, DeletedAt: null }
            });

            return FieldLibraryMapper.toDto(updatedRecord!);
        } catch (error) {
            logger.error(`Error updating field library entry: ${error.message}`);
            throw error;
        }
    };

    public delete = async (id: uuid): Promise<boolean> => {
        try {
            const result = await this._fieldLibraryRepository.softDelete(id);
            return result.affected !== undefined && result.affected > 0;
        } catch (error) {
            logger.error(`Error deleting field library entry: ${error.message}`);
            throw error;
        }
    };

    public search = async (filters: FieldLibrarySearchFilters): Promise<FieldLibrarySearchResults> => {
        try {
            const { PageIndex = 0, ItemsPerPage = 25, ...searchFilters } = filters;
            const skip = PageIndex * ItemsPerPage;

            const whereConditions: any = {
                DeletedAt: null,
            };

            if (searchFilters.Category) {
                whereConditions.Category = searchFilters.Category;
            }

            if (searchFilters.Type) {
                whereConditions.Type = searchFilters.Type;
            }

            if (searchFilters.ResponseType) {
                whereConditions.ResponseType = searchFilters.ResponseType;
            }

            if (searchFilters.IsActive !== undefined) {
                whereConditions.IsActive = searchFilters.IsActive;
            }

            if (searchFilters.Tags) {
                whereConditions.Tags = Like(`%${searchFilters.Tags}%`);
            }

            if (searchFilters.SearchTerm) {
                whereConditions.Name = Like(`%${searchFilters.SearchTerm}%`);
            }

            const findOptions: FindManyOptions<FieldLibrary> = {
                where: whereConditions,
                skip,
                take: ItemsPerPage,
                order: { Sequence: 'ASC', Name: 'ASC' },
            };

            const [records, totalCount] = await this._fieldLibraryRepository.findAndCount(findOptions);

            return FieldLibraryMapper.toSearchResults(records, totalCount, PageIndex, ItemsPerPage);
        } catch (error) {
            logger.error(`Error searching field library entries: ${error.message}`);
            throw error;
        }
    };

    public getAll = async (): Promise<FieldLibraryResponseDto[]> => {
        try {
            const records = await this._fieldLibraryRepository.find({
                where: { DeletedAt: null, IsActive: true },
                order: { Category: 'ASC', Sequence: 'ASC', Name: 'ASC' },
            });

            return records.map(record => FieldLibraryMapper.toDto(record));
        } catch (error) {
            logger.error(`Error getting all field library entries: ${error.message}`);
            throw error;
        }
    };

    public getByCategory = async (category: string): Promise<FieldLibraryResponseDto[]> => {
        try {
            const records = await this._fieldLibraryRepository.find({
                where: { Category: category, DeletedAt: null, IsActive: true },
                order: { Sequence: 'ASC', Name: 'ASC' },
            });

            return records.map(record => FieldLibraryMapper.toDto(record));
        } catch (error) {
            logger.error(`Error getting field library entries by category: ${error.message}`);
            throw error;
        }
    };

    public getCategories = async (): Promise<FieldLibraryCategoryDto[]> => {
        try {
            const records = await this._fieldLibraryRepository.find({
                where: { DeletedAt: null, IsActive: true },
                order: { Category: 'ASC', Sequence: 'ASC', Name: 'ASC' },
            });

            const categoryMap = new Map<string, FieldLibrary[]>();
            records.forEach(record => {
                if (!categoryMap.has(record.Category)) {
                    categoryMap.set(record.Category, []);
                }
                categoryMap.get(record.Category)!.push(record);
            });

            return Array.from(categoryMap.entries()).map(([category, fields]) =>
                FieldLibraryMapper.toCategoryDto(category, fields)
            );
        } catch (error) {
            logger.error(`Error getting field library categories: ${error.message}`);
            throw error;
        }
    };

    public getStatistics = async (): Promise<FieldLibraryStatisticsDto> => {
        try {
            const [totalFields, activeFields, inactiveFields] = await Promise.all([
                this._fieldLibraryRepository.count({ where: { DeletedAt: null } }),
                this._fieldLibraryRepository.count({ where: { DeletedAt: null, IsActive: true } }),
                this._fieldLibraryRepository.count({ where: { DeletedAt: null, IsActive: false } }),
            ]);

            const categories = await this.getCategories();
            const responseTypes = await this._fieldLibraryRepository
                .createQueryBuilder('field')
                .select('DISTINCT field.ResponseType', 'responseType')
                .where('field.DeletedAt IS NULL')
                .getRawMany()
                .then(results => results.map(r => r.responseType));

            return FieldLibraryMapper.toStatisticsDto(
                totalFields,
                activeFields,
                inactiveFields,
                categories,
                responseTypes
            );
        } catch (error) {
            logger.error(`Error getting field library statistics: ${error.message}`);
            throw error;
        }
    };

    public bulkCreate = async (createModels: FieldLibraryCreateModel[]): Promise<FieldLibraryResponseDto[]> => {
        try {
            const fields = createModels.map(model => 
                this._fieldLibraryRepository.create(FieldLibraryMapper.toCreateModel(model))
            );
            
            const records = await this._fieldLibraryRepository.save(fields);
            return records.map(record => FieldLibraryMapper.toDto(record));
        } catch (error) {
            logger.error(`Error bulk creating field library entries: ${error.message}`);
            throw error;
        }
    };

    public clearAll = async (): Promise<void> => {
        try {
            await this._fieldLibraryRepository.clear();
        } catch (error) {
            logger.error(`Error clearing field library entries: ${error.message}`);
            throw error;
        }
    };
}
