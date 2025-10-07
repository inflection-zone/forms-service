import express from 'express';
import { FormFieldController } from './form.field.controller';
import { auth } from '../../auth/auth.handler';
import { FormFieldAuth } from './form.field.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormFieldController();
    const contextBase = 'FormField';

    router.get('/search', auth(FormFieldAuth.search), controller.search);
    router.post('/', auth(FormFieldAuth.create), controller.create);
    router.put('/:id', auth(FormFieldAuth.update), controller.update);
    router.get('/:id', auth(FormFieldAuth.getById), controller.getById);
    router.delete('/:id', auth(FormFieldAuth.delete), controller.delete);

    app.use('/api/v1/form-fields', router);
};
