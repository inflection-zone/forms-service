import express from 'express';
import { LogicalOperationController } from './logical.operation.controller';
import { auth } from '../../../auth/auth.handler';
import { LogicalOperationAuth } from './logical.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new LogicalOperationController();
    const contextBase = 'LogicalOperation';

    router.get('/search', auth(LogicalOperationAuth.search), controller.search);
    router.post('/', auth(LogicalOperationAuth.create), controller.create);
    router.put('/:id', auth(LogicalOperationAuth.update), controller.update);
    router.get('/:id', auth(LogicalOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(LogicalOperationAuth.delete), controller.delete);

    app.use('/api/v1/field-logical-operations', router);
};
