import { Stream } from 'stream';

export interface FileResourceUploadDomainModel {
    id?: string;
    FileMetadata: FileResourceMetadata;
    OwnerUserId?: string;
    UploadedByUserId?: string;
    IsPublicResource?: boolean;
    IsMultiResolutionImage?: boolean;
    MimeType?: string;
    DefaultVersionId?: string;
}

export enum DownloadDisposition {
    Inline = 'inline',
    Attachment = 'attachment',
    Stream = 'stream',
    Auto = 'auto',
}
export interface FileResourceMetadata {
    ResourceId?: string;
    VersionId?: string;
    Version?: string;
    FileName?: string;
    OriginalName?: string;
    SourceFilePath?: string;
    MimeType?: string;
    Size?: number;
    StorageKey?: string;
    IsDefaultVersion?: boolean;
    IsPublicResource?: boolean;
    Disposition?: DownloadDisposition;
    Url?: string;
    Stream?: Stream;
}

// export interface FileResourceMetadata {
//     ResourceId?: string;
//     VersionId?: string;
//     Version?: string;
//     FileName?: string;
//     OriginalName?: string;
//     SourceFilePath?: string;
//     MimeType?: string;
//     Size?: number;
//     StorageKey?: string;
//     IsDefaultVersion?: boolean;
//     IsPublicResource?: boolean;
//     Disposition?: DownloadDisposition;
//     Url?: string;
//     Stream?: Stream;
// }

export interface ResourceReference {
    ItemId: string;
    ItemType: string;
    Keyword: string;
}

export interface FileResourceUpdateModel {
    FileMetadata?: FileResourceMetadata;
    ResourceId: string;
    References?: ResourceReference[];
    Tags?: string[];
    IsMultiResolutionImage?: boolean;
}

export interface FileResourceDetailsDto {
    id?: string;
    FileName?: string;
    Url?: string;
    OwnerUserId?: string;
    UploadedByUserId?: string;
    IsPublicResource?: boolean;
    MimeType?: string;
    DefaultVersion: FileResourceMetadata;
    Versions?: FileResourceMetadata[];
    References?: ResourceReference[];
    Tags?: string[];
}
export interface FileResourceDto {
    id?: string;
    FileName?: string;
    Url?: string;
    OwnerUserId?: string;
    IsPublicResource?: boolean;
    MimeType?: string;
    DefaultVersion: FileResourceMetadata;
}

export interface FileResourceSearchFilters {
    OwnerUserId?: string;
    UploadedByUserId?: string;
    IsPublicResource?: boolean;
    ReferenceId?: string;
    ReferenceType?: string;
    ReferenceKeyword?: string;
    Tag?: string;
    CreatedDateFrom?: Date;
    CreatedDateTo?: Date;
    OrderBy?: string;
    Order?: string;
    PageIndex?: number;
    ItemsPerPage?: number;
}

export interface FileResourceSearchResults {
    TotalCount: number;
    RetrievedCount: number;
    PageIndex: number;
    ItemsPerPage: number;
    Order: string;
    OrderedBy: string;
    Items: FileResourceDto[];
}

export interface FileResourceMetadata {
    ResourceId?: string;
    VersionId?: string;
    Version?: string;
    FileName?: string;
    OriginalName?: string;
    SourceFilePath?: string;
    MimeType?: string;
    Size?: number;
    StorageKey?: string;
    IsDefaultVersion?: boolean;
    IsPublicResource?: boolean;
    Disposition?: DownloadDisposition;
    Url?: string;
    Stream?: Stream;
}
