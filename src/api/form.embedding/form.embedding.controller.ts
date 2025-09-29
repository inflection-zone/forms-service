import express from 'express';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FormService } from '../../database/services/form.submission.service';
import {
    FormSubmissionUpdateModel,
} from '../../domain.types/form.submission.domain.types';
import { FormTemplateService } from '../../database/services/form.template.service';
import * as crypto from 'crypto';
import { Injector } from '../../startup/injector';
import BaseValidator from '../base.validator';
import * as fs from 'fs';
import * as path from 'path';
import { TimeUtils } from '../../common/utilities/time.utils';
import { DurationType } from '../../domain.types/miscellaneous/time.types';

///////////////////////////////////////////////////////////////////////////////////////

export class FormEmbeddingController {
    //#region member variables and constructors

    _service: FormService = Injector.Container.resolve(FormService);

    _formTemplateService = Injector.Container.resolve(FormTemplateService);

    _validator: BaseValidator = new BaseValidator();

    //#endregion

    createSubmission = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this.createSubmissionRecord(request);
            const message = 'Form submission generated successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getCharcoalFormEmbedScript = async (request: express.Request, response: express.Response) => {
        try {

            let scriptContent = this.getEmbedScript();

            // Set appropriate headers for JavaScript content
            response.setHeader('Content-Type', 'application/javascript');
            response.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

            // Send the JavaScript content
            response.send(scriptContent);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getHowToEmbedCharcoalForm = async (request: express.Request, response: express.Response) => {
        const templateId = await this._validator.requestParamAsUUID(request, 'templateId');
        const template = await this._formTemplateService.getById(templateId);
        if (!template) {
            ErrorHandler.throwNotFoundError('Template not found!');
        }
        //Get markdown - how-to-embed-charcoal-form.md
        // Try multiple paths to handle both development and production environments
        const possiblePaths = [
            path.join(__dirname, 'how-to-embed-charcoal-form.md'), // Production (dist folder)
            path.join(process.cwd(), 'src', 'api', 'form.embedding', 'how-to-embed-charcoal-form.md'), // Development
            path.join(process.cwd(), 'dist', 'src', 'api', 'form.embedding', 'how-to-embed-charcoal-form.md') // Alternative production path
        ];

        let markdownPath = null;
        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                markdownPath = possiblePath;
                break;
            }
        }

        if (!markdownPath) {
            ErrorHandler.throwNotFoundError('Markdown file not found in any expected location!');
        }

        let markdown = fs.readFileSync(markdownPath, 'utf8');
        const thisBaseUrl = process.env.THIS_BASE_URL;

        //Replace all instances of {{THIS_BASE_URL}} with the thisBaseUrl
        markdown = markdown.replace(/{{THIS_BASE_URL}}/g, thisBaseUrl);
        //Replace all instances of {{TEMPLATE_ID}} with the templateId
        markdown = markdown.replace(/{{TEMPLATE_ID}}/g, templateId);
        //Replace all instances of {{JAVASCRIPT_EMBED_SCRIPT}} with the embed script
        markdown = markdown.replace(/{{JAVASCRIPT_EMBED_SCRIPT}}/g, this.getEmbedScript());

        return ResponseHandler.success(
            request,
            response,
            'Embed how to use retrieved successfully!',
            201,
            markdown
        );
    };


    private generateUniqueKey = (input: string): string => {
        try {
            const privateKey = process.env.PRIVATE_KEY;
            return crypto
                .createHmac('sha256', privateKey)
                .update(input)
                .digest('hex');
        } catch (error) {
            return null;
        }
    };

    private getEmbedScript() {
        // Try multiple paths to handle both development and production environments
        const possiblePaths = [
            path.join(__dirname, 'charcoal.form.embed.js'), // Production (dist folder)
            path.join(process.cwd(), 'src', 'api', 'form.embedding', 'charcoal.form.embed.js'), // Development
            path.join(process.cwd(), 'dist', 'src', 'api', 'form.embedding', 'charcoal.form.embed.js') // Alternative production path
        ];

        let scriptPath = null;
        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                scriptPath = possiblePath;
                break;
            }
        }

        if (!scriptPath) {
            ErrorHandler.throwNotFoundError('Charcoal script not found in any expected location!');
        }

        // Read the JavaScript file
        let scriptContent = fs.readFileSync(scriptPath, 'utf8');

        //Replace all instances of {{THIS_BASE_URL}} with the thisBaseUrl
        scriptContent = scriptContent.replace(/{{THIS_BASE_URL}}/g, process.env.THIS_BASE_URL);

        return scriptContent;
    }

    private async createSubmissionRecord(request: express.Request) {
        const id: uuid = await this._validator.requestParamAsUUID(
            request,
            'templateId'
        );

        const template = await this._formTemplateService.getById(id);
        if (!template) {
            ErrorHandler.throwNotFoundError('Template not found!');
        }

        const validTill = TimeUtils.addDuration(
            new Date(),
            7,
            DurationType.Day
        );

        const record = await this._service.create({
            FormTemplateId: template.id,
            Category: template.Type,
            Title: template.Title,
            ValidTill: validTill,
            IsEmbedded: true
        });

        if (record === null) {
            ErrorHandler.throwInternalServerError(
                'Unable to generate form link!',
                new Error('Unable to generate form link!')
            );
        }

        const formSubmissionUpdateModel: FormSubmissionUpdateModel = {};

        formSubmissionUpdateModel.Encrypted = this.generateUniqueKey(
            `id=${record.id}&embed=true`
        );

        if (!formSubmissionUpdateModel.Encrypted) {
            ErrorHandler.throwInternalServerError(
                'Unable to generate form link!',
                new Error('Unable to generate form link!')
            );
        }

        formSubmissionUpdateModel.Unencrypted = `id=${record.id}&embed=true`;
        formSubmissionUpdateModel.Link = `${process.env.BASE_URL}/form/submission/${formSubmissionUpdateModel.Encrypted}`;
        formSubmissionUpdateModel.LinkQueryParams = JSON.stringify({
            id: record.id,
            embed: true,
            Category: template.Type,
            ExpiresOn: record.ValidTill,
        });

        const updatedRecord = await this._service.update(
            record.id,
            formSubmissionUpdateModel
        );
        if (!updatedRecord) {
            ErrorHandler.throwInternalServerError(
                'Unable to generate form link!',
                new Error('Unable to generate form link!')
            );
        }
        return updatedRecord;
    }

}
