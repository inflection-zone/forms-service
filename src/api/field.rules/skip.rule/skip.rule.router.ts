import express from 'express';
import { SkipRuleController } from './skip.rule.controller';
import { auth } from '../../../auth.u/auth.handler';
import { SkipRuleAuth } from './skip.rule.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new SkipRuleController();
    const contextBase = 'SkipRule';

    router.get('/search', auth(SkipRuleAuth.search), controller.search);
    router.post('/', auth(SkipRuleAuth.create), controller.create);
    router.put('/:id', auth(SkipRuleAuth.update), controller.update);
    router.get('/:id', auth(SkipRuleAuth.getById), controller.getById);
    router.get('/:id/details', auth(SkipRuleAuth.getDetailsById), controller.getDetailsById);
    router.delete('/:id', auth(SkipRuleAuth.delete), controller.delete);

    app.use('/api/v1/field-skip-rules', router);
};
