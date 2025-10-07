import express from 'express';
import { ValidationRuleController } from './validation.rule.controller';
import { auth } from '../../../auth/auth.handler';
import { ValidationRuleAuth } from './validation.rule.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ValidationRuleController();
    const contextBase = 'ValidationRule';

    router.get('/search', auth(ValidationRuleAuth.search), controller.search);
    router.post('/', auth(ValidationRuleAuth.create), controller.create);
    router.put('/:id', auth(ValidationRuleAuth.update), controller.update);
    router.get('/:id', auth(ValidationRuleAuth.getById), controller.getById);
    router.delete('/:id', auth(ValidationRuleAuth.delete), controller.delete);

    app.use('/api/v1/field-validation-rules', router);
};
