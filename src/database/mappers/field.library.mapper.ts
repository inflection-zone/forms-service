import { FieldLibrary } from '../models/field.library/field.library.model';
import {
    FieldLibraryCreateModel,
    FieldLibraryUpdateModel,
    FieldLibraryResponseDto,
    FieldLibrarySearchResults,
    FieldLibrarySearchResponseDto,
    FieldLibraryCategoryDto,
    FieldLibraryStatisticsDto,
} from '../../domain.types/field.library.domain.types';

export class FieldLibraryMapper {
    private static parseJsonField(field: any): any {
        if (!field) return undefined;
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch (error) {
                return field; // Return as string if parsing fails
            }
        }
        return field; // Already an object
    }

    private static stringifyJsonField(field: any): string | undefined {
        if (!field) return undefined;
        if (typeof field === 'string') return field;
        try {
            return JSON.stringify(field);
        } catch (error) {
            return undefined;
        }
    }

    public static toDto(model: FieldLibrary): FieldLibraryResponseDto {
        return {
            id: model.id,
            FieldId: model.FieldId,
            Name: model.Name,
            Category: model.Category,
            Type: model.Type,
            ResponseType: model.ResponseType,
            Description: model.Description,
            Icon: model.Icon,
            ValidationOptions: this.parseJsonField(model.ValidationOptions),
            ConfigurationOptions: this.parseJsonField(model.ConfigurationOptions),
            DefaultValue: this.parseJsonField(model.DefaultValue),
            IsRequired: model.IsRequired,
            Dependencies: this.parseJsonField(model.Dependencies),
            UseCases: this.parseJsonField(model.UseCases),
            Accessibility: this.parseJsonField(model.Accessibility),
            HtmlType: model.HtmlType,
            Component: model.Component,
            Schema: this.parseJsonField(model.Schema),
            Logic: this.parseJsonField(model.Logic),
            Sequence: model.Sequence,
            IsActive: model.IsActive,
            Tags: model.Tags,
            Version: model.Version,
            CreatedAt: model.CreatedAt,
            UpdatedAt: model.UpdatedAt,
        };
    }

    public static toCreateModel(dto: FieldLibraryCreateModel): Partial<FieldLibrary> {
        return {
            FieldId: dto.FieldId,
            Name: dto.Name,
            Category: dto.Category,
            Type: dto.Type,
            ResponseType: dto.ResponseType,
            Description: dto.Description,
            Icon: dto.Icon,
            ValidationOptions: this.stringifyJsonField(dto.ValidationOptions),
            ConfigurationOptions: this.stringifyJsonField(dto.ConfigurationOptions),
            DefaultValue: this.stringifyJsonField(dto.DefaultValue),
            IsRequired: dto.IsRequired,
            Dependencies: this.stringifyJsonField(dto.Dependencies),
            UseCases: this.stringifyJsonField(dto.UseCases),
            Accessibility: this.stringifyJsonField(dto.Accessibility),
            HtmlType: dto.HtmlType,
            Component: dto.Component,
            Schema: this.stringifyJsonField(dto.Schema),
            Logic: this.stringifyJsonField(dto.Logic),
            Sequence: dto.Sequence || 0,
            IsActive: dto.IsActive !== undefined ? dto.IsActive : true,
            Tags: dto.Tags,
            Version: dto.Version,
        };
    }

    public static toUpdateModel(dto: FieldLibraryUpdateModel): Partial<FieldLibrary> {
        const updateModel: Partial<FieldLibrary> = {};

        if (dto.Name !== undefined) updateModel.Name = dto.Name;
        if (dto.Category !== undefined) updateModel.Category = dto.Category;
        if (dto.Type !== undefined) updateModel.Type = dto.Type;
        if (dto.ResponseType !== undefined) updateModel.ResponseType = dto.ResponseType;
        if (dto.Description !== undefined) updateModel.Description = dto.Description;
        if (dto.Icon !== undefined) updateModel.Icon = dto.Icon;
        if (dto.ValidationOptions !== undefined) updateModel.ValidationOptions = this.stringifyJsonField(dto.ValidationOptions);
        if (dto.ConfigurationOptions !== undefined) updateModel.ConfigurationOptions = this.stringifyJsonField(dto.ConfigurationOptions);
        if (dto.DefaultValue !== undefined) updateModel.DefaultValue = this.stringifyJsonField(dto.DefaultValue);
        if (dto.IsRequired !== undefined) updateModel.IsRequired = dto.IsRequired;
        if (dto.Dependencies !== undefined) updateModel.Dependencies = this.stringifyJsonField(dto.Dependencies);
        if (dto.UseCases !== undefined) updateModel.UseCases = this.stringifyJsonField(dto.UseCases);
        if (dto.Accessibility !== undefined) updateModel.Accessibility = this.stringifyJsonField(dto.Accessibility);
        if (dto.HtmlType !== undefined) updateModel.HtmlType = dto.HtmlType;
        if (dto.Component !== undefined) updateModel.Component = dto.Component;
        if (dto.Schema !== undefined) updateModel.Schema = this.stringifyJsonField(dto.Schema);
        if (dto.Logic !== undefined) updateModel.Logic = this.stringifyJsonField(dto.Logic);
        if (dto.Sequence !== undefined) updateModel.Sequence = dto.Sequence;
        if (dto.IsActive !== undefined) updateModel.IsActive = dto.IsActive;
        if (dto.Tags !== undefined) updateModel.Tags = dto.Tags;
        if (dto.Version !== undefined) updateModel.Version = dto.Version;

        return updateModel;
    }

    public static toSearchResults(
        models: FieldLibrary[],
        totalCount: number,
        pageIndex: number,
        itemsPerPage: number
    ): FieldLibrarySearchResults {
        return {
            Items: models.map(model => this.toDto(model)),
            TotalCount: totalCount,
            RetrievedCount: models.length,
            PageIndex: pageIndex,
            ItemsPerPage: itemsPerPage,
            Order: 'ASC',
            OrderedBy: 'Sequence',
        };
    }

    public static toSearchResponseDto(
        models: FieldLibrary[],
        totalCount: number,
        pageIndex: number,
        itemsPerPage: number
    ): FieldLibrarySearchResponseDto {
        return {
            Items: models.map(model => this.toDto(model)),
            TotalCount: totalCount,
            RetrievedCount: models.length,
            PageIndex: pageIndex,
            ItemsPerPage: itemsPerPage,
            Order: 'ASC',
            OrderedBy: 'Sequence',
        };
    }

    public static toCategoryDto(category: string, fields: FieldLibrary[]): FieldLibraryCategoryDto {
        return {
            Category: category,
            Count: fields.length,
            Fields: fields.map(field => this.toDto(field)),
        };
    }

    public static toStatisticsDto(
        totalFields: number,
        activeFields: number,
        inactiveFields: number,
        categories: FieldLibraryCategoryDto[],
        responseTypes: string[]
    ): FieldLibraryStatisticsDto {
        return {
            TotalFields: totalFields,
            Categories: categories,
            ResponseTypes: responseTypes,
            ActiveFields: activeFields,
            InactiveFields: inactiveFields,
        };
    }
}
