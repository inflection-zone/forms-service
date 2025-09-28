import express from 'express';
import { FormEmbeddingController } from './form.embedding.controller';
import { context } from '../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new FormEmbeddingController();
    // const contextBase = 'FormEmbedding';

    router.get('/:templateId/how-to-embed-charcoal-form', controller.getHowToEmbedCharcoalForm);

    //Please keep this route public. It is used by the Charcoal script to get the form submission.
    router.get('/:templateId/submission', controller.createSubmission);

    app.use('/api/v1/form-embeddings', router);
};
