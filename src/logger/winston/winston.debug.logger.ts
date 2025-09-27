import * as winston from 'winston';
import { AbstrctWinstonLogger } from './abstract.winston.logger';

///////////////////////////////////////////////////////////////////////

export class WinstonDebugLogger extends AbstrctWinstonLogger {

    constructor() {
        super();

        const format = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.label({ 
                label: `[${process.env.NODE_ENV || 'dev'}-${process.env.SERVICE_NAME || 'forms-service'}]` 
            }),
            winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }), // Fixed: MM -> mm
            winston.format.printf(
                (x) =>
                    `${x.timestamp} ${x.label} ${x.level} : ${x.message}`
            )
        );

        winston.addColors({
            info  : 'blue',
            warn  : 'yellow',
            error : 'bold red',
            debug : 'green',
        });

        this._logger = winston.createLogger({
            level: 'debug',  // Remove custom levels for now
            format: format,
            transports: [
                new winston.transports.Console({
                    handleExceptions: true,
                }),
            ]
        });
    }

    info = (str: string) => {
        this._logger?.info(str);
    };

    error = (str: string) => {
        this._logger?.error(str);
    };

    warn = (str: string) => {
        this._logger?.warn(str);
    };

    debug = (str: string) => {
        this._logger?.debug(str);
    };

}
