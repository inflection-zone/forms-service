import { FormSubmissionResponseDto } from "../domain.types/forms/form.domain.types";

export class FormMapper {
    static toDto = (record: any): FormSubmissionResponseDto => {
        if (record === null) {
            return null;
        }

        const dto: FormSubmissionResponseDto = {
            id          : record.id,
            ParentFormTemplate: {
                id                     : record.FormTemplate.id,
                Title                  : record.FormTemplate.Title,
                Description            : record.FormTemplate.Description,
                CurrentVersion         : record.FormTemplate.CorrectAnswer,
                Type                   : record.FormTemplate.Type,
                DisplayCode            : record.FormTemplate.DisplayCode,
                OwnerUserId            : record.FormTemplate.OwnerUserId,
                RootSectionId          : record.FormTemplate.RootSectionId,
                DefaultSectionNumbering: record.DefaultSectionNumbering,
                CreatedAt              : record.FormTemplate.CreatedAt,
                UpdatedAt              : record.FormTemplate.UpdatedAt,
            },
            ParentFormTemplateId: record.FormTemplateId,
            FormUrl             : record.FormUrl,
            Status              : record.FormStatus,
            SubmissionTimestamp : record.SubmissionTimestamp,
            CreatedAt           : record.CreatedAt,
        };
        return dto;
    };

    static toArrayDto(record: any[]): FormSubmissionResponseDto[] {
        if (record === null) {
            return null;
        }

        const dtos: FormSubmissionResponseDto[] = [];

        for (let i = 0; i < record.length; i++) {
            const element = record[i];
            dtos.push({
                id                  : element.id,
                ParentFormTemplateId: element.FormTemplateId,
                ParentFormTemplate  : {
                    id                     : element.FormTemplate.id,
                    Title                  : element.FormTemplate.Title,
                    Description            : element.FormTemplate.Description,
                    CurrentVersion         : element.FormTemplate.CorrectAnswer,
                    Type                   : element.FormTemplate.Type,
                    DisplayCode            : element.FormTemplate.DisplayCode,
                    OwnerUserId            : element.FormTemplate.OwnerUserId,
                    RootSectionId          : element.FormTemplate.RootSectionId,
                    DefaultSectionNumbering: element.DefaultSectionNumbering,
                    CreatedAt              : element.FormTemplate.CreatedAt,
                    UpdatedAt              : element.FormTemplate.UpdatedAt,
                },
                FormUrl            : element.FormUrl,
                AnsweredByUserId   : element.AnsweredByUserId,
                Status             : element.FormStatus,
                SubmissionTimestamp: element.SubmissionTimestamp,
                CreatedAt          : element.CreatedAt
            });
        }
        return dtos;
    }
}
