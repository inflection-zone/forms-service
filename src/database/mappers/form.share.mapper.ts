import { FormShare } from '../models/form.share/form.share.model';
import { FormShareDto } from '../../domain.types/form.share.domain.types';

export class FormShareMapper {
    public static toDto(model: FormShare): FormShareDto {
        const dto: FormShareDto = {
            id: model.id,
            formId: model.formId,
            shareToken: model.shareToken,
            shareType: model.shareType,
            expiresAt: model.expiresAt,
            tokens: model.tokens,
            emails: model.emails,
            isActive: model.isActive,
            createdAt: model.CreatedAt,
        };

        // Add computed URLs
        if (model.shareType === 'single') {
            dto.shareUrl = `${process.env.BASE_URL}/form/submit/${model.shareToken}`;
        } else if (model.shareType === 'multiple' && model.tokens) {
            dto.multipleUrls = model.tokens.map(token => 
                `${process.env.BASE_URL}/form/submit/${token}`
            );
        }

        if (model.emails) {
            dto.emailTokens = model.emails.map(emailToken => ({
                email: emailToken.email,
                url: `${process.env.BASE_URL}/form/submit/${emailToken.token}`
            }));
        }

        return dto;
    }
}
