import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ShareLinkValidator } from './share.link.validator';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { FormShareService } from '../../database/services/form.share.service';
import { ResponseTokenService } from '../../database/services/response.token.service';
import { FormTemplateService } from '../../database/services/form.template.service';
import { Injector } from '../../startup/injector';
import { EmailService } from '../../modules/email/email.service';
import { EmailDetails } from '../../modules/email/email.details';
import { ShareType } from '../../database/models/form.share/form.share.model';
import {
    FormShareCreateModel,
    FormShareDto,
    ResponseTokenCreateModel,
} from '../../domain.types/form.share.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class ShareLinkController {
    //#region member variables and constructors

    _formShareService: FormShareService = Injector.Container.resolve(FormShareService);
    _responseTokenService: ResponseTokenService = Injector.Container.resolve(ResponseTokenService);
    _formTemplateService = Injector.Container.resolve(FormTemplateService);
    _emailService: EmailService = new EmailService();
    _validator: ShareLinkValidator = new ShareLinkValidator();

    //#endregion

    createShare = async (request: express.Request, response: express.Response) => {
        try {
            const validatedData = await this._validator.validateCreateShareRequest(request);
            
            // Get form template
            const template = await this._formTemplateService.getById(validatedData.formId);
            if (!template) {
                ErrorHandler.throwNotFoundError('Template not found!');
            }

            // Create form share
            const formShareCreateModel: FormShareCreateModel = {
                formId: validatedData.formId,
                shareType: validatedData.shareType,
                expiresInValue: validatedData.expiresInValue,
                expiresInUnit: validatedData.expiresInUnit,
                multipleLinksCount: validatedData.multipleLinksCount,
                emailList: validatedData.emailList,
            };

            const formShare = await this._formShareService.create(formShareCreateModel);

            const message = 'Form share details created successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                formShare
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    sendLinkViaEmail = async (request: express.Request, response: express.Response) => {
        try {
            const { FormTemplateId, EmailTo, Message } = request.body;

            // Get form template
            const template = await this._formTemplateService.getById(FormTemplateId);
            if (!template) {
                ErrorHandler.throwNotFoundError('Template not found!');
            }

            // Create form share with email
            const formShareCreateModel: FormShareCreateModel = {
                formId: FormTemplateId,
                shareType: ShareType.SINGLE,
                expiresInValue: 7,
                expiresInUnit: 'days',
                emailList: EmailTo,
            };

            const formShare = await this._formShareService.create(formShareCreateModel);

            // Send email with the share link
            await this.sendFormLinkEmail(formShare, template, EmailTo, Message);

            const message = 'Form link sent via email successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                {
                    formShareId: formShare.id,
                    shareUrl: formShare.shareUrl,
                    emailSentTo: EmailTo
                }
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getShareDetails = async (request: express.Request, response: express.Response) => {
        try {
            const shareToken = request.params.shareToken;
            const formShare = await this._formShareService.getByShareToken(shareToken);

            const message = 'Share details retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                formShare
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    trackResponse = async (request: express.Request, response: express.Response) => {
        try {
            const { responseId, usedToken } = request.body;

            const responseTokenCreateModel: ResponseTokenCreateModel = {
                responseId,
                usedToken,
            };

            const responseToken = await this._responseTokenService.create(responseTokenCreateModel);

            const message = 'Response tracked successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                responseToken
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getShareAnalytics = async (request: express.Request, response: express.Response) => {
        try {
            const shareId = request.params.id;
            const analytics = await this._formShareService.getAnalytics(shareId);

            const message = 'Share analytics retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                analytics
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private sendFormLinkEmail = async (formShare: FormShareDto, template: any, emailTo: string, message?: string): Promise<void> => {
        try {
            // Get email template
            const emailTemplate = await this._emailService.getTemplate('form.share.html');
            
            // Replace template variables
            const emailBody = emailTemplate
                .replace(/{{PLATFORM_NAME}}/g, process.env.PLATFORM_NAME || 'Form Service')
                .replace(/{{RECIPIENT_NAME}}/g, 'User')
                .replace(/{{FORM_TITLE}}/g, template.Title)
                .replace(/{{FORM_CATEGORY}}/g, 'General')
                .replace(/{{EXPIRES_ON}}/g, new Date(formShare.expiresAt).toLocaleDateString())
                .replace(/{{FORM_LINK}}/g, formShare.shareUrl || '')
                .replace(/{{MESSAGE}}/g, message || 'Please fill out this form.');

            const emailDetails: EmailDetails = {
                EmailTo: emailTo,
                Subject: `Form Link: ${template.Title}`,
                Body: emailBody
            };

            await this._emailService.sendEmail(emailDetails, false);
        } catch (error) {
            // Log error but don't throw to avoid breaking the form creation
            console.error('Error sending form link email:', error);
        }
    };
}
