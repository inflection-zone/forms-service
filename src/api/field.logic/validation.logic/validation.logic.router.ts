import express from 'express';
import { ValidationLogicController } from './validation.logic.controller';
import { auth } from '../../../auth/auth.handler';
import { ValidationLogicAuth } from './validation.logic.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ValidationLogicController();
    const contextBase = 'ValidationLogic';

    router.get('/search', auth(ValidationLogicAuth.search), controller.search);
    router.post('/', auth(ValidationLogicAuth.create), controller.create);
    router.put('/:id', auth(ValidationLogicAuth.update), controller.update);
    router.get('/:id', auth(ValidationLogicAuth.getById), controller.getById);
    router.delete('/:id', auth(ValidationLogicAuth.delete), controller.delete);

    app.use('/api/v1/field-validation-logic', router);
};
