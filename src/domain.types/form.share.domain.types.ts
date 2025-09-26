import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { ShareType } from '../database/models/form.share/form.share.model';

///////////////////////////////////////////////////////////////////////////////////////////////

// Form Share DTOs
export interface FormShareCreateModel {
    formId: string;
    shareType: ShareType;
    expiresInValue: number;
    expiresInUnit: 'days' | 'hours' | 'weeks';
    multipleLinksCount?: number;
    emailList?: string;
}

export interface FormShareDto {
    id: string;
    formId: string;
    shareToken: string;
    shareType: ShareType;
    expiresAt: Date;
    tokens: string[] | null;
    emails: Array<{ email: string; token: string }> | null;
    isActive: boolean;
    createdAt: Date;
    shareUrl?: string;
    multipleUrls?: string[] | null;
    emailTokens?: Array<{ email: string; url: string }> | null;
}

export interface FormShareUpdateModel {
    shareType?: ShareType;
    expiresAt?: Date;
    tokens?: string[];
    emails?: Array<{ email: string; token: string }>;
    isActive?: boolean;
}

export interface FormShareSearchFilters extends BaseSearchFilters {
    formId?: string;
    shareType?: ShareType;
    isActive?: boolean;
    isExpired?: boolean;
}

export interface FormShareSearchResults extends BaseSearchResults {
    Items: FormShareDto[];
}

// Response Token DTOs
export interface ResponseTokenCreateModel {
    responseId: string;
    usedToken: string;
    formShareId?: string;
}

export interface ResponseTokenDto {
    id: string;
    responseId: string;
    usedToken: string;
    formShareId?: string;
    createdAt: Date;
}

// Analytics DTOs
export interface ShareAnalyticsDto {
    totalResponses: number;
    responsesByToken: Array<{
        token: string;
        responseCount: number;
        email?: string;
    }>;
    responsesByDate: Array<{
        date: string;
        count: number;
    }>;
}

// Utility Types
export interface EmailTokenPair {
    email: string;
    token: string;
}

export interface EmailUrlPair {
    email: string;
    url: string;
}
