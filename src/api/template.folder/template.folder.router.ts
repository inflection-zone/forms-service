import express from 'express';
import { TemplateFolderController } from './template.folder.controller';
import { auth } from '../../auth/auth.handler';
import { TemplateFolderAuth } from './template.folder.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new TemplateFolderController();
    const contextBase = 'TemplateFolder';

    router.get('/search', auth(TemplateFolderAuth.search), controller.search);
    router.post('/', auth(TemplateFolderAuth.create), controller.create);
    router.put('/:id', auth(TemplateFolderAuth.update), controller.update);
    router.get('/:id', auth(TemplateFolderAuth.getById), controller.getById);
    router.delete('/:id', auth(TemplateFolderAuth.delete), controller.delete);

    app.use('/api/v1/template-folders', router);
};
