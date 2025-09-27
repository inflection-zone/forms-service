import express from 'express';
import { QuestionResponseController } from './question.response.controller';
import { auth } from '../../auth.u/auth.handler';
import { QuestionResponseAuth } from './question.response.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new QuestionResponseController();
    const contextBase = 'QuestionResponse';

    router.get('/search', auth(QuestionResponseAuth.search), controller.search);
    router.post('/', auth(QuestionResponseAuth.create), controller.create);
    router.put('/:id', auth(QuestionResponseAuth.update), controller.update);
    router.get('/:id', auth(QuestionResponseAuth.getById), controller.getById);
    router.delete('/:id', auth(QuestionResponseAuth.delete), controller.delete);
    router.post('/save', auth(QuestionResponseAuth.save), controller.save);

    app.use('/api/v1/question-responses', router);
};
