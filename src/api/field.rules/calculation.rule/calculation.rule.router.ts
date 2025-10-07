import express from 'express';
import { CalculationRuleController } from './calculation.rule.controller';
import { auth } from '../../../auth/auth.handler';
import { CalculationRuleAuth } from './calculation.rule.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CalculationRuleController();
    const contextBase = 'CalculationRule';

    router.get('/search', auth(CalculationRuleAuth.search), controller.search);
    router.post('/', auth(CalculationRuleAuth.create), controller.create);
    router.put('/:id', auth(CalculationRuleAuth.update), controller.update);
    router.get('/:id', auth(CalculationRuleAuth.getById), controller.getById);
    router.delete('/:id', auth(CalculationRuleAuth.delete), controller.delete);

    app.use('/api/v1/field-calculation-rules', router);
};
