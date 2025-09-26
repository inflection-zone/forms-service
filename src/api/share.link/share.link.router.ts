import express from 'express';
import { ShareLinkController } from './share.link.controller';
import { context } from '../../auth/context.handler';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new ShareLinkController();
    const contextBase = 'ShareLink';

    // Form sharing endpoints
    router.post('/', context(`${contextBase}.Create`), controller.createShare);
    router.post('/send-link', context(`${contextBase}.SendLink`), controller.sendLinkViaEmail);
    router.get('/:shareToken', context(`${contextBase}.GetDetails`), controller.getShareDetails);
    router.get('/:id/analytics', context(`${contextBase}.GetAnalytics`), controller.getShareAnalytics);
    
    // Response tracking
    router.post('/track-response', context(`${contextBase}.TrackResponse`), controller.trackResponse);

    app.use('/api/v1/share-link', router);
};
