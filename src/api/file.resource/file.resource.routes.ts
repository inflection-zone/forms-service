import express from 'express';
import { FileResourceController } from './file.resource.controller';
import { context } from '../../auth/context.handler';
// import { FileResourceAuth } from './file.resource.auth';
import { fileUploadMiddleware } from '../../startup/middlewares/file.upload.middleware';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FileResourceController();
    const contextBase = 'FileResource';
    fileUploadMiddleware(router);

    router.post('/upload-binary', controller.uploadBinary);
    router.post('/upload', controller.upload);

    router.get('/:id/download', controller.downloadById);

    router.delete('/:id/versions/:versionId', controller.deleteVersionByVersionId);
    router.delete('/:id', controller.delete);

    //#endregion

    app.use('/api/v1/file-resources', router);
};
