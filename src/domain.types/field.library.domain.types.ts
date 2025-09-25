import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';

export interface FieldLibraryCreateModel {
    FieldId: string;
    Name: string;
    Category: string;
    Type: string;
    ResponseType: string;
    Description?: string;
    Icon?: string;
    ValidationOptions?: any;
    ConfigurationOptions?: any;
    DefaultValue?: any;
    IsRequired: boolean;
    Dependencies?: any;
    UseCases?: string[];
    Accessibility?: any;
    HtmlType?: string;
    Component?: string;
    Schema?: any;
    Logic?: any;
    Sequence?: number;
    IsActive?: boolean;
    Tags?: string;
    Version?: string;
}

export interface FieldLibraryUpdateModel {
    Name?: string;
    Category?: string;
    Type?: string;
    ResponseType?: string;
    Description?: string;
    Icon?: string;
    ValidationOptions?: any;
    ConfigurationOptions?: any;
    DefaultValue?: any;
    IsRequired?: boolean;
    Dependencies?: any;
    UseCases?: string[];
    Accessibility?: any;
    HtmlType?: string;
    Component?: string;
    Schema?: any;
    Logic?: any;
    Sequence?: number;
    IsActive?: boolean;
    Tags?: string;
    Version?: string;
}

export interface FieldLibraryResponseDto {
    id: string;
    FieldId: string;
    Name: string;
    Category: string;
    Type: string;
    ResponseType: string;
    Description?: string;
    Icon?: string;
    ValidationOptions?: any;
    ConfigurationOptions?: any;
    DefaultValue?: any;
    IsRequired: boolean;
    Dependencies?: any;
    UseCases?: string[];
    Accessibility?: any;
    HtmlType?: string;
    Component?: string;
    Schema?: any;
    Logic?: any;
    Sequence: number;
    IsActive: boolean;
    Tags?: string;
    Version?: string;
    CreatedAt: Date;
    UpdatedAt?: Date;
}

export interface FieldLibrarySearchFilters extends BaseSearchFilters {
    Category?: string;
    Type?: string;
    ResponseType?: string;
    IsActive?: boolean;
    Tags?: string;
    SearchTerm?: string;
}

export interface FieldLibrarySearchResults extends BaseSearchResults {
    Items: FieldLibraryResponseDto[];
}

export interface FieldLibrarySearchResponseDto extends BaseSearchResults {
    Items: FieldLibraryResponseDto[];
}

export interface FieldLibraryCategoryDto {
    Category: string;
    Count: number;
    Fields: FieldLibraryResponseDto[];
}

export interface FieldLibraryStatisticsDto {
    TotalFields: number;
    Categories: FieldLibraryCategoryDto[];
    ResponseTypes: string[];
    ActiveFields: number;
    InactiveFields: number;
}
