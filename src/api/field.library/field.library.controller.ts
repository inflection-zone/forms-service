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
}
