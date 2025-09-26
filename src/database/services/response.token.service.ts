import {
    ResponseTokenCreateModel,
    ResponseTokenDto,
} from '../../domain.types/form.share.domain.types';
import { BaseService } from './base.service';
import { Source } from '../database.connector';
import { Repository } from 'typeorm';
import { ResponseToken } from '../models/response.token/response.token.model';
import { ResponseTokenMapper } from '../mappers/response.token.mapper';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ResponseTokenService extends BaseService {

    _responseTokenRepository: Repository<ResponseToken> = Source.getRepository(ResponseToken);

    // Response Token operations
    public create = async (createModel: ResponseTokenCreateModel): Promise<ResponseTokenDto> => {
        const responseToken = this._responseTokenRepository.create({
            responseId: createModel.responseId,
            usedToken: createModel.usedToken,
            formShareId: createModel.formShareId,
        });

        const record = await this._responseTokenRepository.save(responseToken);
        return ResponseTokenMapper.toDto(record);
    };

    public getByResponseId = async (responseId: uuid): Promise<ResponseTokenDto> => {
        const record = await this._responseTokenRepository.findOne({ where: { responseId } });
        if (!record) {
            ErrorHandler.throwNotFoundError('Response token not found!');
        }
        return ResponseTokenMapper.toDto(record);
    };

    public getByUsedToken = async (usedToken: string): Promise<ResponseTokenDto> => {
        const record = await this._responseTokenRepository.findOne({ where: { usedToken } });
        if (!record) {
            ErrorHandler.throwNotFoundError('Response token not found!');
        }
        return ResponseTokenMapper.toDto(record);
    };

    public existsByResponseId = async (responseId: uuid): Promise<boolean> => {
        const count = await this._responseTokenRepository.count({ where: { responseId } });
        return count > 0;
    };

    public existsByUsedToken = async (usedToken: string): Promise<boolean> => {
        const count = await this._responseTokenRepository.count({ where: { usedToken } });
        return count > 0;
    };
}
