import express from 'express';
import { FunctionExpressionOperationController } from './function.expression.operation.controller';
import { auth } from '../../../auth.u/auth.handler';
import { FunctionExpressionOperationAuth } from './function.expression.operation.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    
    const router = express.Router();
    const controller = new FunctionExpressionOperationController();
    const contextBase = 'FunctionExpressionOperation';

    router.get('/search', auth(FunctionExpressionOperationAuth.search), controller.search);
    router.post('/', auth(FunctionExpressionOperationAuth.create), controller.create);
    router.put('/:id', auth(FunctionExpressionOperationAuth.update), controller.update);
    router.get('/:id', auth(FunctionExpressionOperationAuth.getById), controller.getById);
    router.delete('/:id', auth(FunctionExpressionOperationAuth.delete), controller.delete);

    app.use('/api/v1/field-function-expression-operations', router);
};
