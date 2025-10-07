import express from 'express';
import { FallbackRuleController } from './fallback.rule.controller';
import { auth } from '../../../auth/auth.handler';
import { FallbackRuleAuth } from './fallback.rule.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FallbackRuleController();
    const contextBase = 'FallbackRule';

    router.get('/search', auth(FallbackRuleAuth.search), controller.search);
    router.post('/', auth(FallbackRuleAuth.create), controller.create);
    router.put('/:id', auth(FallbackRuleAuth.update), controller.update);
    router.get('/:id', auth(FallbackRuleAuth.getById), controller.getById);
    router.delete('/id', auth(FallbackRuleAuth.delete), controller.delete);

    app.use('/api/v1/field-fallback-rules', router);
};
