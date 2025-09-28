import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Injector } from './injector';
import { Scheduler } from './scheduler';
import { logger } from '../logger/logger';

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Loader {

    //#region Variables
    
    private static _scheduler: Scheduler = Scheduler.instance();

    private static _container: DependencyContainer = container;

    //#endregion

    public static get Scheduler() {
        return Loader._scheduler;
    }

    public static get Container() {
        return Loader._container;
    }

    public static init = async (): Promise<boolean> => {
        try {

            //Register injections here...
            Injector.registerInjections();

            // Loader._authenticator = container.resolve(Authenticator);
            // Loader._authorizer = container.resolve(Authorizer);

            return true;

        } catch (error) {
            logger.error(error.message);
            return false;
        }
    };

}
