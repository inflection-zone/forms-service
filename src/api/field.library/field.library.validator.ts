import { Request } from 'express';
import BaseValidator from '../base.validator';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import {
    FieldLibraryCreateModel,
    FieldLibraryUpdateModel,
    FieldLibrarySearchFilters,
} from '../../domain.types/field.library.domain.types';

export class FieldLibraryValidator extends BaseValidator {
    public validateCreateRequest = async (request: Request): Promise<FieldLibraryCreateModel> => {
        const body = request.body;

        if (!body.FieldId) {
            ErrorHandler.throwInputValidationError(['FieldId is required']);
        }

        if (!body.Name) {
            ErrorHandler.throwInputValidationError(['Name is required']);
        }

        if (!body.Category) {
            ErrorHandler.throwInputValidationError(['Category is required']);
        }

        if (!body.Type) {
            ErrorHandler.throwInputValidationError(['Type is required']);
        }

        if (!body.ResponseType) {
            ErrorHandler.throwInputValidationError(['ResponseType is required']);
        }

        const model: FieldLibraryCreateModel = {
            FieldId: body.FieldId,
            Name: body.Name,
            Category: body.Category,
            Type: body.Type,
            ResponseType: body.ResponseType,
            Description: body.Description,
            Icon: body.Icon,
            ValidationOptions: body.ValidationOptions,
            ConfigurationOptions: body.ConfigurationOptions,
            DefaultValue: body.DefaultValue,
            IsRequired: body.IsRequired || false,
            Dependencies: body.Dependencies,
            UseCases: body.UseCases,
            Accessibility: body.Accessibility,
            HtmlType: body.HtmlType,
            Component: body.Component,
            Schema: body.Schema,
            Logic: body.Logic,
            Sequence: body.Sequence || 0,
            IsActive: body.IsActive !== undefined ? body.IsActive : true,
            Tags: body.Tags,
            Version: body.Version || '1.0.0',
        };

        return model;
    };

    public validateUpdateRequest = async (request: Request): Promise<FieldLibraryUpdateModel> => {
        const body = request.body;

        const model: FieldLibraryUpdateModel = {};

        if (body.Name !== undefined) {
            model.Name = body.Name;
        }

        if (body.Category !== undefined) {
            model.Category = body.Category;
        }

        if (body.Type !== undefined) {
            model.Type = body.Type;
        }

        if (body.ResponseType !== undefined) {
            model.ResponseType = body.ResponseType;
        }

        if (body.Description !== undefined) {
            model.Description = body.Description;
        }

        if (body.Icon !== undefined) {
            model.Icon = body.Icon;
        }

        if (body.ValidationOptions !== undefined) {
            model.ValidationOptions = body.ValidationOptions;
        }

        if (body.ConfigurationOptions !== undefined) {
            model.ConfigurationOptions = body.ConfigurationOptions;
        }

        if (body.DefaultValue !== undefined) {
            model.DefaultValue = body.DefaultValue;
        }

        if (body.IsRequired !== undefined) {
            model.IsRequired = body.IsRequired;
        }

        if (body.Dependencies !== undefined) {
            model.Dependencies = body.Dependencies;
        }

        if (body.UseCases !== undefined) {
            model.UseCases = body.UseCases;
        }

        if (body.Accessibility !== undefined) {
            model.Accessibility = body.Accessibility;
        }

        if (body.HtmlType !== undefined) {
            model.HtmlType = body.HtmlType;
        }

        if (body.Component !== undefined) {
            model.Component = body.Component;
        }

        if (body.Schema !== undefined) {
            model.Schema = body.Schema;
        }

        if (body.Logic !== undefined) {
            model.Logic = body.Logic;
        }

        if (body.Sequence !== undefined) {
            model.Sequence = body.Sequence;
        }

        if (body.IsActive !== undefined) {
            model.IsActive = body.IsActive;
        }

        if (body.Tags !== undefined) {
            model.Tags = body.Tags;
        }

        if (body.Version !== undefined) {
            model.Version = body.Version;
        }

        return model;
    };

    public validateSearchRequest = async (request: Request): Promise<FieldLibrarySearchFilters> => {
        const query = request.query;

        const filters: FieldLibrarySearchFilters = {
            PageIndex: query.pageIndex ? parseInt(query.pageIndex as string) : 0,
            ItemsPerPage: query.itemsPerPage ? parseInt(query.itemsPerPage as string) : 25,
        };

        if (query.Category) {
            filters.Category = query.Category as string;
        }

        if (query.Type) {
            filters.Type = query.Type as string;
        }

        if (query.ResponseType) {
            filters.ResponseType = query.ResponseType as string;
        }

        if (query.IsActive !== undefined) {
            filters.IsActive = query.IsActive === 'true';
        }

        if (query.Tags) {
            filters.Tags = query.Tags as string;
        }

        if (query.SearchTerm) {
            filters.SearchTerm = query.SearchTerm as string;
        }

        return filters;
    };
}
