import express from 'express';
import { SkipLogicController } from './skip.logic.controller';
import { auth } from '../../../auth.u/auth.handler';
import { SkipLogicAuth } from './skip.logic.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    
    const router = express.Router();
    const controller = new SkipLogicController();
    const contextBase = 'SkipLogic';

    router.get('/search', auth(SkipLogicAuth.search), controller.search);
    router.post('/', auth(SkipLogicAuth.create), controller.create);
    router.put('/:id', auth(SkipLogicAuth.update), controller.update);
    router.get('/:id', auth(SkipLogicAuth.getById), controller.getById);
    router.delete('/:id', auth(SkipLogicAuth.delete), controller.delete);

    app.use('/api/v1/field-skip-logic', router);
};
