import express from 'express';
import { UserController } from './user.controller';
import { auth } from '../../auth/auth.handler';
import { UserAuth } from './user.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new UserController();
    const contextBase = 'User';

    router.get('/all', auth(UserAuth.getAll), controller.getAll);
    router.get('/search', auth(UserAuth.search), controller.search);
    router.post('/', auth(UserAuth.create), controller.create);
    router.put('/:id', auth(UserAuth.update), controller.update);
    router.get('/:id', auth(UserAuth.getById), controller.getById);
    router.delete('/:id', auth(UserAuth.delete), controller.delete);

    app.use('/api/v1/users', router);
};
