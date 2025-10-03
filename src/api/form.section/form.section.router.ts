import express from 'express';
import { FormSectionController } from './form.section.controller';
import { auth } from '../../auth.u/auth.handler';
import { FormSectionAuth } from './form.section.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormSectionController();
    const contextBase = 'FormSection';

    router.get('/search', auth(FormSectionAuth.search), controller.search);
    router.post('/', auth(FormSectionAuth.create), controller.create);
    router.put('/:id', auth(FormSectionAuth.update), controller.update);
    router.get('/:id', auth(FormSectionAuth.getById), controller.getById);
    router.delete('/:id', auth(FormSectionAuth.delete), controller.delete);

    app.use('/api/v1/form-sections', router);
};
