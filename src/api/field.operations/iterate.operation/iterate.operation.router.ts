import express from 'express';
import { IterateOperationController } from './iterate.operation.controller';
import { auth } from '../../../auth/auth.handler';
import { IterateOperationAuth } from './iterate.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new IterateOperationController();
    const contextBase = 'IterateOperation';

    router.get('/search', auth(IterateOperationAuth.search), controller.search);
    router.post('/', auth(IterateOperationAuth.create), controller.create);
    router.put('/:id', auth(IterateOperationAuth.update), controller.update);
    router.get('/:id', auth(IterateOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(IterateOperationAuth.delete), controller.delete);

    app.use('/api/v1/field-iterate-operations', router);
};
