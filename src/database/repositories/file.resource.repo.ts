import { FindManyOptions, ILike, Repository } from 'typeorm';
import { IFileResourceRepo } from '../repository.interface/file.resource/file.resource.repo.interface';
import {
    FileResourceUpdateModel,
    FileResourceUploadDomainModel,
    FileResourceDetailsDto,
    FileResourceDto,
    FileResourceSearchFilters,
    FileResourceSearchResults,
    FileResourceMetadata,
} from '../../domain.types/file.resource.upload.domain.types';
import { FileResourceMapper } from '../mappers/file.resource.mapper';
import { FileResource } from '../models/file.resource/file.resource.model';
import { FileResourceReference } from '../models/file.resource/file.resource.reference.model';
import { FileResourceVersion } from '../models/file.resource/file.resource.version.model';
import { Source } from '../database.connector';
import { logger } from '../../logger/logger';

///////////////////////////////////////////////////////////////////////

export class FileResourceRepo implements IFileResourceRepo {
    private _resourceRepo: Repository<FileResource> = Source.getRepository(FileResource);
    private _referenceRepo: Repository<FileResourceReference> = Source.getRepository(FileResourceReference);
    private _versionRepo: Repository<FileResourceVersion> = Source.getRepository(FileResourceVersion);

    create = async (domainModel: FileResourceUploadDomainModel): Promise<FileResourceDetailsDto> => {
        try {
            const entity = this._resourceRepo.create({
                FileName: domainModel.FileMetadata.OriginalName,
                OwnerUserId: domainModel.OwnerUserId ?? null,
                UploadedByUserId: domainModel.UploadedByUserId ?? null,
                IsPublicResource: domainModel.IsPublicResource ?? false,
                IsMultiResolutionImage: domainModel.IsMultiResolutionImage ?? false,
                Tags: null,
                MimeType: domainModel.MimeType ?? null,
                UploadedDate: new Date(),
                DefaultVersionId: domainModel.DefaultVersionId ?? null,
            });
            const resource = await this._resourceRepo.save(entity);
            return FileResourceMapper.toDetailsDto(resource);
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    };

    getById = async (id: string): Promise<FileResourceDetailsDto> => {
        const resource = await this._resourceRepo.findOne({
            where: { id: id },
            relations: { DefaultVersion: true },
        });
        if (!resource) {
            return null;
        }
        const dto = FileResourceMapper.toDetailsDto(resource);

        const references = await this._referenceRepo.find({ where: { ResourceId: id } });
        dto.References = FileResourceMapper.toFileReferenceDtos(references);

        if (resource.DefaultVersionId) {
            const defaultVersion = await this._versionRepo.findOne({ where: { id: resource.DefaultVersionId } });
            dto.DefaultVersion = FileResourceMapper.toFileVersionDto(defaultVersion);
        }

        const versions = await this._versionRepo.find({
            where: { ResourceId: id },
            order: { UpdatedAt: 'DESC' },
        });
        dto.Versions = FileResourceMapper.toFileVersionDtos(versions);
        return dto;
    };

    isPublicResource = async (id: string): Promise<boolean> => {
        const resource = await this._resourceRepo.findOne({ where: { id: id } });
        if (!resource) {
            return false;
        }
        return resource.IsPublicResource;
    };

    update = async (id: string, model: FileResourceUpdateModel): Promise<FileResourceDetailsDto> => {
        const references: FileResourceReference[] = [];
        const addReferences = model.References && model.References.length > 0;
        if (addReferences) {
            for await (const reference of model.References) {
                const ref = this._referenceRepo.create({
                    ResourceId: id,
                    ReferenceId: reference.ItemId,
                    Type: reference.ItemType,
                    Keyword: reference.Keyword,
                });
                references.push(await this._referenceRepo.save(ref));
            }
        }

        const resource = await this._resourceRepo.findOne({ where: { id: id } });
        if (!resource) {
            throw new Error('Cannot find the resource!');
        }
        resource.FileName = model.FileMetadata?.OriginalName ?? resource.FileName;
        resource.IsMultiResolutionImage = model.IsMultiResolutionImage ?? resource.IsMultiResolutionImage;
        resource.MimeType = model.FileMetadata?.MimeType ?? resource.MimeType;

        if (model.Tags != null && model.Tags.length > 0) {
            let existingTags = resource.Tags ? (JSON.parse(resource.Tags) as Array<string>) : [];
            existingTags.push(...model.Tags);
            existingTags = [...new Set(existingTags)];
            resource.Tags = JSON.stringify(existingTags);
        }
        await this._resourceRepo.save(resource);

        const dto = FileResourceMapper.toDetailsDto(resource);
        dto.References = FileResourceMapper.toFileReferenceDtos(references);

        if (resource.DefaultVersionId) {
            const defaultVersion = await this._versionRepo.findOne({ where: { id: resource.DefaultVersionId } });
            dto.DefaultVersion = FileResourceMapper.toFileVersionDto(defaultVersion);
        }

        const versions = await this._versionRepo.find({
            where: { ResourceId: id },
            order: { UpdatedAt: 'DESC' },
        });
        dto.Versions = FileResourceMapper.toFileVersionDtos(versions, true);
        return dto;
    };

    addVersion = async (metadata: FileResourceMetadata, makeDefaultVersion: boolean): Promise<FileResourceMetadata> => {
        const fileVersion = this._versionRepo.create({
            ResourceId: metadata.ResourceId,
            Version: metadata.Version,
            FileName: metadata.FileName,
            OriginalFileName: metadata.OriginalName,
            MimeType: metadata.MimeType,
            StorageKey: metadata.StorageKey,
            SizeInKB: metadata.Size,
        });

        const version = await this._versionRepo.save(fileVersion);
        if (!version) {
            throw new Error('Unable to create version instance in database!');
        }

        if (makeDefaultVersion) {
            const resource = await this._resourceRepo.findOne({ where: { id: metadata.ResourceId } });
            if (!resource) {
                throw new Error('Unable to find resource!');
            }
            resource.DefaultVersionId = version.id;
            await this._resourceRepo.save(resource);
        }
        return FileResourceMapper.toFileVersionDto(version);
    };

    searchForDownload = async (filters: FileResourceSearchFilters): Promise<FileResourceDto[]> => {
        try {
            const search = this.constructSearchOptions(filters);
            const [list] = await this._resourceRepo.findAndCount(search);
            const dtos: FileResourceDto[] = list.map((resource) => FileResourceMapper.toDto(resource));
            return dtos;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    };

    getVersionByVersionName = async (id: string, versionName: string): Promise<FileResourceMetadata> => {
        const fileResourceVersion = await this._versionRepo.findOne({
            where: {
                ResourceId: id,
                Version: ILike(`%${versionName}%`),
            },
        });
        return FileResourceMapper.toFileVersionDto(fileResourceVersion);
    };

    getVersionByVersionId = async (id: string, versionId: string): Promise<FileResourceMetadata> => {
        const fileResourceVersion = await this._versionRepo.findOne({
            where: {
                ResourceId: id,
                id: versionId,
            },
        });
        return FileResourceMapper.toFileVersionDto(fileResourceVersion);
    };

    getLatestVersion = async (id: string): Promise<FileResourceMetadata> => {
        const fileResourceVersion = await this._versionRepo.findOne({
            where: { ResourceId: id },
            order: { CreatedAt: 'DESC' },
        });
        return FileResourceMapper.toFileVersionDto(fileResourceVersion);
    };

    getVersions = async (id: string) => {
        const fileResourceVersions = await this._versionRepo.find({ where: { ResourceId: id } });
        return FileResourceMapper.toFileVersionDtos(fileResourceVersions);
    };

    getVersionNames = async (id: string): Promise<string[]> => {
        const versions = await this._versionRepo.find({ where: { ResourceId: id } });
        return versions.map((x) => x.Version);
    };

    search = async (filters: FileResourceSearchFilters): Promise<FileResourceSearchResults> => {
        try {
            let orderByColumn: keyof FileResource = 'CreatedAt' as any;
            if (filters.OrderBy) {
                orderByColumn = filters.OrderBy as any;
            }
            let order: 'ASC' | 'DESC' = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }

            const limit = filters.ItemsPerPage ?? 25;
            const pageIndex = filters.PageIndex && filters.PageIndex > 0 ? filters.PageIndex : 0;
            const skip = pageIndex * limit;

            const search = this.constructSearchOptions(filters);
            search.order = { [orderByColumn]: order } as any;
            search.take = limit;
            search.skip = skip;

            const [list, count] = await this._resourceRepo.findAndCount(search);

            const dtos: FileResourceDto[] = list.map((resource) => FileResourceMapper.toDto(resource));
            const searchResults: FileResourceSearchResults = {
                TotalCount: count,
                RetrievedCount: dtos.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn as string,
                Items: dtos,
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    };

    rename = async (id: string, newFileName: string): Promise<boolean> => {
        const resource = await this._resourceRepo.findOne({ where: { id: id } });
        if (!resource) {
            throw new Error('Cannot find the resource!');
        }
        resource.FileName = newFileName;
        await this._resourceRepo.save(resource);
        return true;
    };

    delete = async (id: string): Promise<boolean> => {
        await this._versionRepo.delete({ ResourceId: id });
        await this._referenceRepo.delete({ ResourceId: id });
        const result = await this._resourceRepo.delete({ id: id });
        return (result.affected ?? 0) > 0;
    };

    deleteVersionByVersionId = async (id: any, versionId: any): Promise<boolean> => {
        const result = await this._versionRepo.delete({ ResourceId: id, id: versionId });
        return (result.affected ?? 0) > 0;
    };

    //#region Privates

    private constructSearchOptions(filters: FileResourceSearchFilters) {
        const search: FindManyOptions<FileResource> = {
            relations: {
                DefaultVersion: true,
            },
            where: {},
        };

        if (filters.OwnerUserId != null) {
            search.where['OwnerUserId'] = ILike(`%${filters.OwnerUserId}%`);
        }
        if (filters.UploadedByUserId != null) {
            search.where['UploadedByUserId'] = ILike(`%${filters.UploadedByUserId}%`);
        }
        if (filters.IsPublicResource != null) {
            search.where['IsPublicResource'] = filters.IsPublicResource;
        }
        if (filters.Tag != null) {
            search.where['Tags'] = ILike(`%${filters.Tag}%`);
        }
        // Date range filter can be added with query builder if needed
        return search;
    }

    //#endregion
}
