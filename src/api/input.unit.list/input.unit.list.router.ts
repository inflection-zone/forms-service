import express from 'express';
import { InputUnitListController } from './input.unit.list.controller';
import { auth } from '../../auth/auth.handler';
import { InputUnitListAuth } from './input.unit.list.auth';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    //#region member variables and constructors
    const router = express.Router();
    const controller = new InputUnitListController();
    const contextBase = 'InputUnitList';

    router.get('/search', auth(InputUnitListAuth.search), controller.search);
    router.post('/', auth(InputUnitListAuth.create), controller.create);
    router.put('/:id', auth(InputUnitListAuth.update), controller.update);
    router.get('/:id', auth(InputUnitListAuth.getById), controller.getById);
    router.delete('/:id', auth(InputUnitListAuth.delete), controller.delete);

    app.use('/api/v1/input-units', router);
};
