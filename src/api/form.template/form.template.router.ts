import express from 'express';
import { FormTemplateController } from './form.template.controller';
import { auth } from '../../auth.u/auth.handler';
import { FormTemplateAuth } from './form.template.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormTemplateController();
    const contextBase = 'FormTemplate';

    router.get('/search', auth(FormTemplateAuth.search), controller.search);
    router.post('/', auth(FormTemplateAuth.create), controller.create);
    router.put('/:id', auth(FormTemplateAuth.update), controller.update);
    router.get('/:id', auth(FormTemplateAuth.getById), controller.getById);
    router.delete('/:id', auth(FormTemplateAuth.delete), controller.delete);
    router.get('/:id/details', auth(FormTemplateAuth.getDetailsById), controller.getDetailsById);

    app.use('/api/v1/form-templates', router);
};
