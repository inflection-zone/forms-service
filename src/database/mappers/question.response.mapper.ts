import { QuestionResponseResponseDto } from '../../domain.types/response.domain.types';

export class ResponseMapper {
    static toDto = (record: any): QuestionResponseResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: QuestionResponseResponseDto = {
            id: record.id,
            FormSubmission: record.FormSubmission ? {
                id: record.FormSubmission.id,
                FormTemplateId: record.FormSubmission.FormTemplateId,
                Title: record.FormSubmission.Title,
                Type: record.FormSubmission.Type,
                TenantId: record.FormSubmission.TenantId,
                UserId: record.FormSubmission.UserId,
                UserMetaData: record.FormSubmission.UserMetaData,
                Encrypted: record.FormSubmission.Encrypted,
                Unencrypted: record.FormSubmission.Unencrypted,
                Link: record.FormSubmission.Link,
                LinkQueryParams: record.FormSubmission.LinkQueryParams,
                Status: record.FormSubmission.Status,
                ValidTill: record.FormSubmission.ValidTill,
                SubmittedAt: record.FormSubmission.SubmittedAt,
                Score: record.FormSubmission.Score,
                CreatedAt: record.FormSubmission.CreatedAt,
                UpdatedAt: record.FormSubmission.UpdatedAt,
            } : null,
            Question: record.FormField ? {
                id: record.FormField.id,
                Title: record.FormField.Title,
                Description: record.FormField.Description,
                DisplayCode: record.FormField.DisplayCode,
                ResponseType: record.FormField.ResponseType,
                Score: record.FormField.Score,
                CorrectAnswer: record.FormField.CorrectAnswer,
                Hint: record.FormField.Hint,
                TemplateId: record.FormField.ParentTemplateId,
                SectionId: record.FormField.ParentSectionId,
                CreatedAt: record.FormField.CreatedAt,
                UpdatedAt: record.FormField.UpdatedAt,
            } : null,
            FormFieldId: record.FormFieldId,
            FormTemplateId: record.FormTemplateId,
            ResponseType: record.ResponseType,
            IntegerValue: record.IntegerValue,
            FloatValue: record.FloatValue,
            BooleanValue: record.BooleanValue,
            DateTimeValue: record.DateTimeValue,
            Url: record.Url,
            FileResourceId: record.FileResourceId,
            TextValue: record.TextValue,
            SubmissionTimestamp: record.SubmissionTimestamp,
            LastSaveTimestamp: record.LastSaveTimestamp,
        };
        return dto;
    };

    static toArrayDto(records: any[]): QuestionResponseResponseDto[] {
        if (records === null) {
            return [];
        }
        return records.map(record => ResponseMapper.toDto(record));
    }
}
