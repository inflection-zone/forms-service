import express from 'express';
import { FieldLibraryController } from './field.library.controller';
import { context } from '../../auth/context.handler';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FieldLibraryController();
    const contextBase = 'FieldLibrary';

    // Field library entries
    router.get('/', context(`${contextBase}.GetAll`), controller.getAll);
    router.get('/search', context(`${contextBase}.Search`), controller.search);
    router.get('/categories', context(`${contextBase}.GetCategories`), controller.getCategories);
    router.get('/statistics', context(`${contextBase}.GetStatistics`), controller.getStatistics);
    router.get('/status', context(`${contextBase}.GetSeedingStatus`), controller.getSeedingStatus);
    router.get('/:id', context(`${contextBase}.GetById`), controller.getById);
    router.get('/field/:fieldId', context(`${contextBase}.GetByFieldId`), controller.getByFieldId);
    router.get('/category/:category', context(`${contextBase}.GetByCategory`), controller.getByCategory);

    // Field library management
    router.post('/', context(`${contextBase}.Create`), controller.create);
    router.put('/:id', context(`${contextBase}.Update`), controller.update);
    router.delete('/:id', context(`${contextBase}.Delete`), controller.delete);

    // Field library seeding
    router.post('/seed', context(`${contextBase}.Seed`), controller.seed);
    router.post('/seed/:category', context(`${contextBase}.SeedByCategory`), controller.seedByCategory);

    app.use('/api/v1/field-library', router);
};
