import express from 'express';
import { FormController } from './form.controller';
import { auth } from '../../auth.u/auth.handler';
import { FormSubmissionAuth } from './form.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormController();
    const contextBase = 'FormSubmission';

    router.get('/search', auth(FormSubmissionAuth.search), controller.search);
    router.put('/submit', auth(FormSubmissionAuth.submit), controller.submit);
    router.post('/', auth(FormSubmissionAuth.create), controller.create);
    router.put('/:id', auth(FormSubmissionAuth.update), controller.update);
    router.get('/:id', auth(FormSubmissionAuth.getById), controller.getById);
    router.delete('/:id', auth(FormSubmissionAuth.delete), controller.delete);

    app.use('/api/v1/form-submissions', router);
};
