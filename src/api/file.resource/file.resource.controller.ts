import express from 'express';
import fs from 'fs';
import path from 'path';
import { AppError } from '../../common/error.handling/app.error';
import { ResponseHandler } from '../../common/handlers/response.handler';
import { TimeUtils } from '../../common/utilities/time.utils';
import {
    FileResourceDetailsDto,
    FileResourceDto,
    FileResourceSearchFilters,
    DownloadDisposition,
    FileResourceMetadata,
} from '../../domain.types/file.resource.upload.domain.types';
import { FileResourceService } from '../../database/services/file.resource.service';
import { FileResourceValidator } from './file.resource.validator';
import AdmZip from 'adm-zip';
import { Injector } from '../../startup/injector';
import { Helper } from '../../common/helper';

///////////////////////////////////////////////////////////////////////////////////////

export class FileResourceController {
    //#region member variables and constructors

    _service: FileResourceService = Injector.Container.resolve(FileResourceService);

    // _roleService: RoleService = Injector.Container.resolve(RoleService);

    // _personService: PersonService = Injector.Container.resolve(PersonService);

    _validator: FileResourceValidator = new FileResourceValidator();

    // constructor() {
    //     super();
    // }

    //#endregion

    //#region Action methods

    upload = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            var domainModels = await this._validator.upload(request);

            if (domainModels.length === 0) {
                throw new AppError('File resource not found!', 400);
            }

            // Authorize
            const tempModel = domainModels[0];
            // await this.authorizeOne(request, tempModel?.OwnerUserId);

            var dtos = [];
            for await (var model of domainModels) {
                var dto = await this._service.upload(model);
                dtos.push(this.sanitizeDto(dto));
            }

            ResponseHandler.success(request, response, 'File resource uploaded successfully!', 201, {
                FileResources: dtos,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    searchAndDownload = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            let filters: FileResourceSearchFilters = await this._validator.search(request);
            // filters = await this.authorizeSearch(request, filters);

            const downloadedFolder = await this._service.searchAndDownload(filters);
            var filenames = fs.readdirSync(downloadedFolder);
            if (filenames.length === 0) {
                throw new AppError('File resources are not found.', 404);
            }
            var zipper = new AdmZip();
            for await (var f of filenames) {
                var fullFilePath = path.join(downloadedFolder, f);
                zipper.addLocalFile(fullFilePath);
            }
            var timestamp = TimeUtils.timestamp(new Date());
            var zipFile = `${timestamp}.zip`;
            const data = zipper.toBuffer();

            response.set('Content-Type', 'application/octet-stream');
            response.set('Content-Disposition', `attachment; filename=${zipFile}`);
            response.set('Content-Length', data.length.toString());
            response.send(data);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    downloadByVersionName = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.DownloadByVersionName';
            const metadata: FileResourceMetadata = await this._validator.getByVersionName(request);
            var resource = await this._service.getById(metadata.ResourceId);
            // if (resource.IsPublicResource === false) {
            //     //NOTE: Please note that this is deviation from regular pattern of
            //     //authentication middleware pipeline. Here we are authenticating client
            //     //and user only when the file resource is not public.
            //     // await AuthHandler.verifyAccess(request);
            //     await this.authorizeOne(request, resource.OwnerUserId);
            // }
            console.log(`Download request for Resource Id:: ${metadata.ResourceId}
                and Version:: ${metadata.Version}`);
            const localDestination = await this._service.downloadByVersionName(metadata.ResourceId, metadata.Version);
            this.streamToResponse(localDestination, response, metadata);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    downloadByVersionId = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.DownloadByVersionId';
            const metadata: FileResourceMetadata = await this._validator.getByVersionId(request);
            var resource = await this._service.getById(metadata.ResourceId);

            // if (resource.IsPublicResource === false) {

            //     //NOTE: Please note that this is deviation from regular pattern of
            //     //authentication middleware pipeline. Here we are authenticating client
            //     //and user only when the file resource is not public.
            //     // await AuthHandler.verifyAccess(request);
            //     await this.authorizeOne(request, resource.OwnerUserId);
            // }

            const localDestination = await this._service.downloadByVersionId(metadata.ResourceId, metadata.VersionId);

            this.streamToResponse(localDestination, response, metadata);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    downloadById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.DownloadById';
            const metadata = await this._validator.downloadById(request);

            var resource = await this._service.getById(metadata.ResourceId);
            if (!resource) {
                throw new AppError('Resource not found!', 404);
            }

            // if (resource.IsPublicResource === false) {

            //     //NOTE: Please note that this is deviation from regular pattern of
            //     //authentication middleware pipeline. Here we are authenticating client
            //     //and user only when the file resource is not public.
            //     // await AuthHandler.verifyAccess(request);
            //     // await this.authorizeOne(request, resource.OwnerUserId);
            // }

            const localDestination = await this._service.downloadById(metadata.ResourceId);
            this.streamToResponse(localDestination, response, metadata);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.Delete';
            const id: string = await this._validator.delete(request);
            await this.checkResourceAuthorization(request, id);

            const deleted = await this._service.delete(id);
            if (!deleted) {
                throw new AppError('File resource cannot be deleted.', 400);
            }

            ResponseHandler.success(request, response, 'File resource record deleted successfully!', 200, {
                Deleted: true,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteVersionByVersionId = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            request.context = 'FileResource.DeleteVersionByVersionId';
            const metadata: FileResourceMetadata = await this._validator.getByVersionId(request);

            await this.checkResourceAuthorization(request, metadata.ResourceId);

            const deleted = await this._service.deleteVersionByVersionId(metadata.ResourceId, metadata.VersionId);
            if (!deleted) {
                throw new AppError('File resource version cannot be deleted.', 400);
            }

            ResponseHandler.success(request, response, 'File resource version deleted successfully!', 200, {
                Deleted: true,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private async checkResourceAuthorization(request, resourceId) {
        const record = await this._service.getById(resourceId);
        if (!record) {
            throw new AppError('Resource not found!', 404);
        }
        // await this.authorizeOne(request, record.OwnerUserId);
    }

    //#region Privates

    private streamToResponse(localDestination: string, response: express.Response<any, Record<string, any>>, metadata: FileResourceMetadata) {
        if (localDestination == null) {
            throw new AppError('File resource not found.', 404);
        }

        var filename = path.basename(localDestination);
        var mimetype = metadata.MimeType ?? Helper.getMimeType(localDestination);
        if (!mimetype) {
            mimetype = 'text/plain';
        }

        this.setDownloadResponseHeaders(response, metadata.Disposition, mimetype, filename);

        var filestream = fs.createReadStream(localDestination);
        filestream.pipe(response);
    }

    private sanitizeDto(dto: FileResourceDto): FileResourceDto {
        if (dto !== null && dto.DefaultVersion) {
            dto.DefaultVersion.StorageKey = null;
            dto.DefaultVersion.SourceFilePath = null;
        }
        return dto;
    }

    private sanitizeDetailsDto(dto: FileResourceDetailsDto): FileResourceDetailsDto {
        if (dto && dto.DefaultVersion) {
            dto.DefaultVersion.StorageKey = null;
        }
        if (dto.Versions && dto.Versions.length > 0) {
            dto.Versions.forEach((x) => {
                if (x !== null) {
                    x.StorageKey = null;
                    x.SourceFilePath = null;
                }
            });
        }
        return dto;
    }

    private setDownloadResponseHeaders(response: express.Response, disposition: DownloadDisposition, mimeType: string, filename: string) {
        response.setHeader('Content-type', mimeType);
        filename = encodeURIComponent(filename);

        if (disposition === DownloadDisposition.Attachment) {
            response.setHeader('Content-disposition', 'attachment; filename=' + filename);
        } else if (disposition === DownloadDisposition.Inline || mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/bmp') {
            response.setHeader('Content-disposition', 'inline');
        } else {
            response.setHeader('Content-disposition', 'attachment; filename=' + filename);
        }
    }

    //#endregion
}
