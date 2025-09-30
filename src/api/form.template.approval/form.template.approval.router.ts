import express from 'express';
import { FormTemplateApprovalController } from './form.template.approval.controller';
import { auth } from '../../auth.u/auth.handler';
import { FormTemplateApprovalAuth } from './form.template.approval.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormTemplateApprovalController();
    const contextBase = 'FormTemplateApproval';

    router.get('/search', auth(FormTemplateApprovalAuth.search), controller.search);
    router.post('/', auth(FormTemplateApprovalAuth.create), controller.create);
    router.put('/:id', auth(FormTemplateApprovalAuth.update), controller.update);
    router.get('/:id', auth(FormTemplateApprovalAuth.getById), controller.getById);
    router.delete('/:id', auth(FormTemplateApprovalAuth.delete), controller.delete);

    app.use('/api/v1/form-template-approvals', router);
};
