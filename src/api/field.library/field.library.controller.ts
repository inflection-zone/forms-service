import express from 'express';
import { FieldLibraryService } from '../../database/services/field.library.service';
import { FieldLibraryValidator } from './field.library.validator';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { ErrorHandler } from '../../common/error.handling/error.handler';
import { Injector } from '../../startup/injector';
import { FieldLibrarySeeder } from '../../database/seeders/field.library.seeder';

export class FieldLibraryController {
    //#region member variables and constructors

    _service: FieldLibraryService = Injector.Container.resolve(FieldLibraryService);
    _validator: FieldLibraryValidator = new FieldLibraryValidator();
    _seeder: FieldLibrarySeeder = new FieldLibrarySeeder();

    //#endregion

    // Get all field library entries
    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const records = await this._service.getAll();
            const message = 'Field library entries retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                records
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get field library entry by ID
    getById = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            const record = await this._service.getById(id);
            const message = 'Field library entry retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get field library entry by field ID
    getByFieldId = async (request: express.Request, response: express.Response) => {
        try {
            const fieldId = request.params.fieldId;
            const record = await this._service.getByFieldId(fieldId);
            const message = 'Field library entry retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Search field library entries
    search = async (request: express.Request, response: express.Response) => {
        try {
            const filters = await this._validator.validateSearchRequest(request);
            const results = await this._service.search(filters);
            const message = 'Field library entries retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                results
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get fields by category
    getByCategory = async (request: express.Request, response: express.Response) => {
        try {
            const category = request.params.category;
            const records = await this._service.getByCategory(category);
            const message = `Field library entries for category '${category}' retrieved successfully!`;
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                records
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get all categories
    getCategories = async (request: express.Request, response: express.Response) => {
        try {
            const categories = await this._service.getCategories();
            const message = 'Field library categories retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                categories
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get field library statistics
    getStatistics = async (request: express.Request, response: express.Response) => {
        try {
            const statistics = await this._service.getStatistics();
            const message = 'Field library statistics retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                statistics
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Create field library entry
    create = async (request: express.Request, response: express.Response) => {
        try {
            const model = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            const message = 'Field library entry created successfully!';
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

    // Update field library entry
    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            const model = await this._validator.validateUpdateRequest(request);
            const record = await this._service.update(id, model);
            const message = 'Field library entry updated successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                record
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Delete field library entry
    delete = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            const success = await this._service.delete(id);
            if (!success) {
                ErrorHandler.throwNotFoundError('Field library entry not found!');
            }
            const message = 'Field library entry deleted successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                { deleted: true }
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Seed field library data
    seed = async (request: express.Request, response: express.Response) => {
        try {
            await this._seeder.seed();
            const message = 'Field library data seeded successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                { seeded: true }
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Seed field library data by category
    seedByCategory = async (request: express.Request, response: express.Response) => {
        try {
            const category = request.params.category;
            await this._seeder.seedByCategory(category);
            const message = `Field library data for category '${category}' seeded successfully!`;
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                { seeded: true, category }
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get seeding status
    getSeedingStatus = async (request: express.Request, response: express.Response) => {
        try {
            const status = await this._seeder.getSeedingStatus();
            const message = 'Field library seeding status retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                status
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get all field templates
    getTemplates = async (request: express.Request, response: express.Response) => {
        try {
            // For now, return mock data. This would be implemented with proper database queries
            const templates = [
                {
                    id: '1',
                    name: 'Basic Form Template',
                    description: 'A basic form template with common field types',
                    category: 'general',
                    fields: [],
                    version: '1.0.0',
                    tags: ['basic', 'general'],
                    isPublic: true,
                    createdBy: 'system',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '2',
                    name: 'Healthcare Assessment',
                    description: 'Healthcare-specific fields for medical assessments',
                    category: 'healthcare',
                    fields: [],
                    version: '1.0.0',
                    tags: ['healthcare', 'medical'],
                    isPublic: true,
                    createdBy: 'system',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: '3',
                    name: 'Survey Collection',
                    description: 'Fields optimized for survey and research data collection',
                    category: 'survey',
                    fields: [],
                    version: '1.0.0',
                    tags: ['survey', 'research'],
                    isPublic: true,
                    createdBy: 'system',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            const message = 'Field templates retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                templates
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Get field template by ID
    getTemplateById = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            // Mock implementation - would query database
            const template = {
                id: id,
                name: 'Sample Template',
                description: 'A sample field template',
                category: 'general',
                fields: [],
                version: '1.0.0',
                tags: ['sample'],
                isPublic: true,
                createdBy: 'system',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const message = 'Field template retrieved successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                template
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Create field template
    createTemplate = async (request: express.Request, response: express.Response) => {
        try {
            const body = request.body;
            
            // Validate required fields
            if (!body.name) {
                ErrorHandler.throwInputValidationError(['Name is required']);
            }

            if (!body.description) {
                ErrorHandler.throwInputValidationError(['Description is required']);
            }

            // Mock implementation - would save to database
            const template = {
                id: Math.random().toString(36).substr(2, 9),
                name: body.name,
                description: body.description,
                category: body.category || 'general',
                fields: body.fields || [],
                version: body.version || '1.0.0',
                tags: body.tags || [],
                isPublic: body.isPublic || false,
                createdBy: body.createdBy || 'current-user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const message = 'Field template created successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                template
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Update field template
    updateTemplate = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            const body = request.body;

            // Mock implementation - would update in database
            const template = {
                id: id,
                name: body.name,
                description: body.description,
                category: body.category,
                fields: body.fields,
                version: body.version,
                tags: body.tags,
                isPublic: body.isPublic,
                createdBy: body.createdBy,
                createdAt: body.createdAt,
                updatedAt: new Date().toISOString()
            };

            const message = 'Field template updated successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                template
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Delete field template
    deleteTemplate = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            
            // Mock implementation - would delete from database
            const message = `Field template with ID '${id}' deleted successfully!`;
            return ResponseHandler.success(
                request,
                response,
                message,
                200,
                { deleted: true, id }
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Import field template
    importTemplate = async (request: express.Request, response: express.Response) => {
        try {
            // For now, we'll handle this as a JSON body instead of file upload
            // In a real implementation, you'd use multer middleware for file uploads
            const body = request.body;
            
            if (!body || !body.templateData) {
                ErrorHandler.throwInputValidationError(['Template data is required']);
            }

            // Mock implementation - would parse JSON and save to database
            const template = {
                id: Math.random().toString(36).substr(2, 9),
                name: body.templateData.name || 'Imported Template',
                description: body.templateData.description || 'Imported from file',
                category: body.templateData.category || 'imported',
                fields: body.templateData.fields || [],
                version: body.templateData.version || '1.0.0',
                tags: body.templateData.tags || ['imported'],
                isPublic: body.templateData.isPublic || false,
                createdBy: 'current-user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const message = 'Field template imported successfully!';
            return ResponseHandler.success(
                request,
                response,
                message,
                201,
                template
            );
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // Export field template
    exportTemplate = async (request: express.Request, response: express.Response) => {
        try {
            const id = request.params.id;
            
            // Mock implementation - would fetch from database and create JSON file
            const template = {
                id: id,
                name: 'Sample Template',
                description: 'A sample field template',
                category: 'general',
                fields: [],
                version: '1.0.0',
                tags: ['sample'],
                isPublic: true,
                createdBy: 'system',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Content-Disposition', `attachment; filename="field-template-${id}.json"`);
            response.send(JSON.stringify(template, null, 2));
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
