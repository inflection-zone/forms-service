import {
    FormShareCreateModel,
    FormShareDto,
    FormShareSearchFilters,
    FormShareUpdateModel,
    FormShareSearchResults,
} from '../../domain.types/form.share.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { FindManyOptions, Repository } from 'typeorm';
import { FormShare, ShareType } from '../models/form.share/form.share.model';
import { FormShareMapper } from '../mappers/form.share.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { logger } from '../../logger/logger';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { EmailTokenPair } from '../../domain.types/form.share.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class FormShareService extends BaseService {

    _formShareRepository: Repository<FormShare> = Source.getRepository(FormShare);

    // Form Share operations
    public create = async (createModel: FormShareCreateModel): Promise<FormShareDto> => {
        const shareToken = this.generateToken();
        const expiresAt = this.calculateExpirationDate(createModel.expiresInValue, createModel.expiresInUnit);
        
        let tokens: string[] | null = null;
        let emails: EmailTokenPair[] | null = null;

        if (createModel.shareType === ShareType.MULTIPLE && createModel.multipleLinksCount) {
            tokens = Array.from({ length: createModel.multipleLinksCount }, () => this.generateToken());
        }

        if (createModel.emailList) {
            const emailList = this.parseEmails(createModel.emailList);
            emails = emailList.map(email => ({
                email,
                token: this.generateToken()
            }));
        }

        const formShare = this._formShareRepository.create({
            formId: createModel.formId,
            shareToken,
            shareType: createModel.shareType,
            expiresAt,
            tokens,
            emails,
            isActive: true,
        });

        const record = await this._formShareRepository.save(formShare);
        return FormShareMapper.toDto(record);
    };

    public getById = async (id: uuid): Promise<FormShareDto> => {
        const record = await this._formShareRepository.findOne({ where: { id } });
        if (!record) {
            ErrorHandler.throwNotFoundError('Form share not found!');
        }
        return FormShareMapper.toDto(record);
    };

    public getByShareToken = async (shareToken: string): Promise<FormShareDto> => {
        const record = await this._formShareRepository.findOne({ where: { shareToken } });
        if (!record) {
            ErrorHandler.throwNotFoundError('Form share not found!');
        }
        return FormShareMapper.toDto(record);
    };

    public update = async (id: uuid, updateModel: FormShareUpdateModel): Promise<FormShareDto> => {
        const record = await this._formShareRepository.findOne({ where: { id } });
        if (!record) {
            ErrorHandler.throwNotFoundError('Form share not found!');
        }

        Object.assign(record, updateModel);
        const updatedRecord = await this._formShareRepository.save(record);
        return FormShareMapper.toDto(updatedRecord);
    };

    public delete = async (id: uuid): Promise<boolean> => {
        const result = await this._formShareRepository.delete(id);
        return result.affected > 0;
    };

    public search = async (filters: FormShareSearchFilters): Promise<FormShareSearchResults> => {
        const options: FindManyOptions<FormShare> = {
            where: this.buildSearchConditions(filters),
            order: { CreatedAt: 'DESC' },
            skip: filters.PageIndex ? (filters.PageIndex - 1) * (filters.ItemsPerPage || 10) : 0,
            take: filters.ItemsPerPage || 10,
        };

        const [records, total] = await this._formShareRepository.findAndCount(options);
        const items = records.map(record => FormShareMapper.toDto(record));

        return {
            Items: items,
            TotalCount: total,
            RetrievedCount: items.length,
            PageIndex: filters.PageIndex || 1,
            ItemsPerPage: filters.ItemsPerPage || 10,
            Order: 'DESC',
            OrderedBy: 'CreatedAt',
        };
    };

    public getAnalytics = async (id: uuid): Promise<any> => {
        // Implementation for analytics
        // This would include response tracking, token usage, etc.
        return {
            totalResponses: 0,
            responsesByToken: [],
            responsesByDate: []
        };
    };

    // Utility methods
    private generateToken = (): string => {
        return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    };

    private calculateExpirationDate = (value: number, unit: 'days' | 'hours' | 'weeks'): Date => {
        const now = new Date();
        switch (unit) {
            case 'days':
                return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
            case 'hours':
                return new Date(now.getTime() + value * 60 * 60 * 1000);
            case 'weeks':
                return new Date(now.getTime() + value * 7 * 24 * 60 * 60 * 1000);
            default:
                return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
        }
    };

    private parseEmails = (emailList: string): string[] => {
        return emailList
            .split(/[,\n]/)
            .map(email => email.trim())
            .filter(email => email.length > 0 && this.isValidEmail(email));
    };

    private isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    private buildSearchConditions = (filters: FormShareSearchFilters): any => {
        const conditions: any = {};

        if (filters.formId) {
            conditions.formId = filters.formId;
        }

        if (filters.shareType) {
            conditions.shareType = filters.shareType;
        }

        if (filters.isActive !== undefined) {
            conditions.isActive = filters.isActive;
        }

        if (filters.isExpired !== undefined) {
            if (filters.isExpired) {
                conditions.expiresAt = { $lt: new Date() };
            } else {
                conditions.expiresAt = { $gte: new Date() };
            }
        }

        return conditions;
    };
}
