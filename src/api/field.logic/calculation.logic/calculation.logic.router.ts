import express from 'express';
import { CalculationLogicController } from './calculation.logic.controller';
import { auth } from '../../../auth.u/auth.handler';
import { CalculationLogicAuth } from './calculation.logic.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CalculationLogicController();
    const contextBase = 'CalculationLogic';

    router.get('/search', auth(CalculationLogicAuth.search), controller.search);
    router.post('/', auth(CalculationLogicAuth.create), controller.create);
    router.put('/:id', auth(CalculationLogicAuth.update), controller.update);
    router.get('/:id', auth(CalculationLogicAuth.getById), controller.getById);
    router.delete('/:id', auth(CalculationLogicAuth.delete), controller.delete);

    app.use('/api/v1/field-calculation-logic', router);
};
