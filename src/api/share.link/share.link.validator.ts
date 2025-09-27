import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import BaseValidator from '../base.validator';
import { ShareType } from '../../database/models/form.share/form.share.model';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ShareLinkValidator extends BaseValidator {

    public validateCreateShareRequest = async (
        request: express.Request
    ): Promise<any> => {
        try {
            const schema = joi.object({
                formId: joi.string().uuid().required(),
                shareType: joi.string().valid(...Object.values(ShareType)).required(),
                expiresInValue: joi.number().min(1).required(),
                expiresInUnit: joi.string().valid('days', 'hours', 'weeks').required(),
                multipleLinksCount: joi.number().min(1).max(100).optional(),
                emailList: joi.string().optional(),
            });

            await schema.validateAsync(request.body);

            return {
                formId: request.body.formId,
                shareType: request.body.shareType,
                expiresInValue: request.body.expiresInValue,
                expiresInUnit: request.body.expiresInUnit,
                multipleLinksCount: request.body.multipleLinksCount,
                emailList: request.body.emailList,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSendLinkRequest = async (
        request: express.Request
    ): Promise<any> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().required(),
                EmailTo: joi.string().email().required(),
                Message: joi.string().max(500).optional(),
            });

            await schema.validateAsync(request.body);

            return {
                FormTemplateId: request.body.FormTemplateId,
                EmailTo: request.body.EmailTo,
                Message: request.body.Message || null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateTrackResponseRequest = async (
        request: express.Request
    ): Promise<any> => {
        try {
            const schema = joi.object({
                responseId: joi.string().uuid().required(),
                usedToken: joi.string().required(),
            });

            await schema.validateAsync(request.body);

            return {
                responseId: request.body.responseId,
                usedToken: request.body.usedToken,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSendMultipleLinksRequest = async (
        request: express.Request
    ): Promise<any> => {
        try {
            const schema = joi.object({
                FormTemplateId: joi.string().uuid().required(),
                EmailList: joi.array().items(joi.string().email()).min(1).max(50).required(),
                Message: joi.string().max(500).optional(),
                ExpiresInValue: joi.number().min(1).optional(),
                ExpiresInUnit: joi.string().valid('days', 'hours', 'weeks').optional(),
            });

            await schema.validateAsync(request.body);

            return {
                FormTemplateId: request.body.FormTemplateId,
                EmailList: request.body.EmailList,
                Message: request.body.Message || null,
                ExpiresInValue: request.body.ExpiresInValue || 7,
                ExpiresInUnit: request.body.ExpiresInUnit || 'days',
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
