import express from 'express';
import { MathematicalOperationController } from './mathematical.operation.controller';
import { auth } from '../../../auth.u/auth.handler';
import { MathematicalOperationAuth } from './mathematical.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new MathematicalOperationController();
    const contextBase = 'MathematicalOperation';

    router.get('/search', auth(MathematicalOperationAuth.search), controller.search);
    router.post('/', auth(MathematicalOperationAuth.create), controller.create);
    router.put('/:id', auth(MathematicalOperationAuth.update), controller.update);
    router.get('/:id', auth(MathematicalOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(MathematicalOperationAuth.delete), controller.delete);

    app.use('/api/v1/field-mathematical-operations', router);
};
