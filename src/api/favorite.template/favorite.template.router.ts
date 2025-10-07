import express from 'express';
import { FavoriteTemplateController } from './favorite.template.controller';
import { auth } from '../../auth/auth.handler';
import { FavoriteTemplateAuth } from './favorite.template.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FavoriteTemplateController();
    const contextBase = 'FavoriteTemplate';

    router.get('/search', auth(FavoriteTemplateAuth.search), controller.search);
    router.post('/', auth(FavoriteTemplateAuth.create), controller.create);
    router.put('/:id', auth(FavoriteTemplateAuth.update), controller.update);
    router.get('/:id', auth(FavoriteTemplateAuth.getById), controller.getById);
    router.delete('/:id', auth(FavoriteTemplateAuth.delete), controller.delete);

    app.use('/api/v1/favorite-templates', router);
};
