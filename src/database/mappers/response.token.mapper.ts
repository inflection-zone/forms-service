import { ResponseToken } from '../models/response.token/response.token.model';
import { ResponseTokenDto } from '../../domain.types/form.share.domain.types';

export class ResponseTokenMapper {
    public static toDto(model: ResponseToken): ResponseTokenDto {
        return {
            id: model.id,
            responseId: model.responseId,
            usedToken: model.usedToken,
            formShareId: model.formShareId,
            createdAt: model.CreatedAt,
        };
    }
}
