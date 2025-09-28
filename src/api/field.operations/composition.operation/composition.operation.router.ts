import express from 'express';
import { CompositionOperationController } from './composition.operation.controller';
import { auth } from '../../../auth.u/auth.handler';
import { CompositionOperationAuth } from './composition.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    //#region member variables and constructors
    const router = express.Router();
    const controller = new CompositionOperationController();
    const contextBase = 'CompositionOperation';

    router.get('/search', auth(CompositionOperationAuth.search), controller.search);
    router.post('/', auth(CompositionOperationAuth.create), controller.create);
    router.put('/:id', auth(CompositionOperationAuth.update), controller.update);
    router.get('/:id', auth(CompositionOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(CompositionOperationAuth.delete), controller.delete);

    app.use('/api/v1/field-composition-operations', router);
    //#endregion

};
