import joi from 'joi';
import express from 'express';
import {
    ErrorHandler
} from '../../common/error.handler';
import BaseValidator from '../base.validator';
import { FormTemplateCreateModel, FormTemplateSearchFilters, FormTemplateUpdateModel } from '../../domain.types/forms/form.template.domain.types';
import { generateDisplayCode } from '../../domain.types/miscellaneous/display.code';
import { ParsedQs } from 'qs';
///////////////////////////////////////////////////////////////////////////////////////////////

export class FormTemplateValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<FormTemplateCreateModel> => {
        try {
            const schema = joi.object({
                Title: joi.string().required(),
                Description: joi.string().max(512).optional(),
                CurrentVersion: joi.number().optional(),
                Type: joi.string().required(),
                ItemsPerPage: joi.string().required(),
                DisplayCode: joi.string().optional(),
                OwnerUserId: joi.string().uuid(),
                RootSectionId: joi.string().uuid(),
                DefaultSectionNumbering: joi.boolean().optional()
            });
            await schema.validateAsync(request.body);
            return {
                Title: request.body.Title,
                Description: request.body.Description ?? null,
                CurrentVersion: request.body.CurrentVersion ?? 1,
                Type: request.body.Type,
                ItemsPerPage: request.body.ItemsPerPage,
                DisplayCode: request.body.DisplayCode ?? generateDisplayCode(30, 'ASSESS_TEMP_#'),
                OwnerUserId: request.body.OwnerUserId,
                RootSectionId: request.body.RootSectionId,
                DefaultSectionNumbering: request.body.DefaultSectionNumbering ?? false,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<FormTemplateUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Title: joi.string().optional(),
                Description: joi.string().max(512).optional(),
                CurrentVersion: joi.number().optional(),
                Type: joi.string().optional(),
                ItemsPerPage: joi.string().optional(),
                DisplayCode: joi.string().max(64).optional(),
                OwnerUserId: joi.string().uuid().optional(),
                RootSectionId: joi.string().uuid().optional(),
                DefaultSectionNumbering: joi.boolean().optional()
            });
            await schema.validateAsync(request.body);
            return {
                Title: request.body.Title ?? null,
                Description: request.body.Description ?? null,
                CurrentVersion: request.body.CurrentVersion ?? null,
                Type: request.body.Type ?? null,
                ItemsPerPage: request.body.ItemsPerPage ?? null,
                DisplayCode: request.body.DisplayCode ?? null,
                OwnerUserId: request.body.OwnerUserId ?? null,
                RootSectionId: request.body.RootSectionId ?? null,
                DefaultSectionNumbering: request.body.DefaultSectionNumbering ?? null
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<FormTemplateSearchFilters> => {
        try {
            const schema = joi.object({
                id: joi.string().uuid().optional(),
                title: joi.string().optional(),
                description: joi.string().optional(),
                currentVersion: joi.number().optional(),
                type: joi.string().optional(),
                displayCode: joi.string().optional(),
                ownerUserId: joi.string().uuid().optional(),
                rootSectionId: joi.string().uuid().optional(),
                defaultSectionNumbering: joi.boolean().optional()
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): FormTemplateSearchFilters => {
        var filters: any = {};

        var id = query.id ? query.id : null;
        if (id != null) {
            filters['id'] = id;
        }

        var title = query.title ? query.title : null;
        if (title != null) {
            filters['title'] = title;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }
        var currentVersion = query.currentVersion ? query.currentVersion : null;
        if (currentVersion != null) {
            filters['currentVersion'] = currentVersion;
        }
        var type = query.type ? query.type : null;
        if (type != null) {
            filters['type'] = type;
        }

        var displayCode = query.displayCode ? query.displayCode : null;
        if (displayCode != null) {
            filters['displayCode'] = displayCode;
        }
        var ownerUserId = query.ownerUserId ? query.ownerUserId : null;
        if (ownerUserId != null) {
            filters['ownerUserId'] = ownerUserId;
        }
        var rootSectionId = query.rootSectionId ? query.rootSectionId : null;
        if (rootSectionId != null) {
            filters['rootSectionId'] = rootSectionId;
        }
        var defaultSectionNumbering = query.defaultSectionNumbering ? query.defaultSectionNumbering : null;
        if (defaultSectionNumbering != null) {
            filters['defaultSectionNumbering'] = defaultSectionNumbering;
        }


        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };

}


