import { FormStatus } from './enums/form.submission.enums';
import { QueryResponseType } from './query.response.types';
import {
    BaseSearchFilters,
    BaseSearchResults,
} from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface QuestionResponseCreateModel {
    FormSubmissionId: string;
    // QuestionId: string;
    FormFieldId: string;
    FormTemplateId: string;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: number;
    BooleanValue: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    UserResponse: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date;
}

export interface QuestionResponseUpdateModel {
    id?: string;
    FormSubmissionId?: string;
    // QuestionId?: string;
    FormFieldId?: string;
    FormTemplateId?: string;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: number;
    BooleanValue?: string;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: string;
    TextValue?: string;
    UserResponse?: string;
    SubmissionTimestamp?: Date;
    LastSaveTimestamp?: Date;
}

export interface QuestionResponseSaveModel {
    QuestionResponses: QuestionResponseUpdateModel[];
    FormSubmissionKey: string;
}

export interface QuestionResponseResponseDto {
    id: string;
    FormSubmission?: {
        id: string;
        FormTemplateId: string;
        Title?: string;
        Type: string;
        TenantId?: string;
        UserId?: string;
        UserMetaData?: string;
        Encrypted?: string;
        Unencrypted?: string;
        Link?: string;
        LinkQueryParams?: string;
        Status: FormStatus;
        ValidTill: Date;
        SubmittedAt?: Date;
        Score?: number;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    Question?: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer: string;
        Hint: string;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    FormFieldId: string;
    FormTemplateId: string;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: number;
    BooleanValue?: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date;
}

export interface QuestionResponseSearchFilters extends BaseSearchFilters {
    FormSubmissionId?: uuid;
    // QuestionId?: uuid;
    FormFieldId?: uuid;
    FormTemplateId?: uuid;
    ResponseType?: QueryResponseType;
    IntegerValue?: number;
    FloatValue?: number;
    BooleanValue?: string;
    DateTimeValue?: Date;
    Url?: string;
    FileResourceId?: uuid;
    TextValue?: string;
    SubmissionTimestamp?: Date;
    LastSaveTimestamp?: Date;
}

export interface QuestionResponseSearchResults extends BaseSearchResults {
    Items: QuestionResponseSearchResponseDto[];
}

export interface QuestionResponseSearchResponseDto extends BaseSearchResults {
    id: string;
    FormSubmission: {
        id: string;
        FormTemplateId: string;
        Title?: string;
        Type: string;
        TenantId?: string;
        UserId?: string;
        UserMetaData?: string;
        Encrypted?: string;
        Unencrypted?: string;
        Link?: string;
        LinkQueryParams?: string;
        Status: FormStatus;
        ValidTill: Date;
        SubmittedAt?: Date;
        Score?: number;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    Question: {
        id: string;
        Title: string;
        Description: string;
        DisplayCode: string;
        ResponseType: QueryResponseType;
        Score: number;
        CorrectAnswer: string;
        Hint: string;
        TemplateId: string;
        SectionId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    };
    FormFieldId: string;
    FormTemplateId: string;
    ResponseType: QueryResponseType;
    IntegerValue: number;
    FloatValue: number;
    BooleanValue?: string;
    DateTimeValue: Date;
    Url: string;
    FileResourceId: string;
    TextValue: string;
    SubmissionTimestamp: Date;
    LastSaveTimestamp: Date;
}
