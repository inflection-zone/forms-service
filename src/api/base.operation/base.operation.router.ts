import express from 'express';
import { BaseOperationController } from './base.operation.controller';
import { auth } from '../../auth/auth.handler';
import { BaseOperationAuth } from './base.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new BaseOperationController();
    const contextBase = 'BaseOperation';

    router.get('/search', auth(BaseOperationAuth.search), controller.search);
    router.post('/', auth(BaseOperationAuth.create), controller.create);
    router.put('/:id', auth(BaseOperationAuth.update), controller.update);
    router.get('/:id', auth(BaseOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(BaseOperationAuth.delete), controller.delete);

    app.use('/api/v1/base-operations', router);
};
