/* eslint-disable no-console */
import { AbstrctCustomLogger } from './abstract.custom.logger';

///////////////////////////////////////////////////////////////////////

export class CustomDebugLogger extends AbstrctCustomLogger {

    constructor() {
        super();
    }

    info = (str: string) => {
        const dateTime = new Date().toISOString();
        if (this._useConsole) {
            console.log(`[${dateTime}] INFO: ${str}`);
        }
        else {
            const str_ = `[${dateTime}]  INFO  ${str}\n`;
            this._stream.write(str_);
        }
    };

    error = (str: string) => {
        const dateTime = new Date().toISOString();
        if (this._useConsole) {
            console.error(`[${dateTime}] ERROR: ${str}`);
        }
        else {
            const str_ = `[${dateTime}]  ERROR  ${str}\n`;
            this._stream.write(str_);
        }
    };

    warn = (str: string) => {
        const dateTime = new Date().toISOString();
        if (this._useConsole) {
            console.warn(`[${dateTime}] WARN: ${str}`);
        }
        else {
            const str_ = `[${dateTime}]  WARN  ${str}\n`;
            this._stream.write(str_);
        }
    };

    debug = (str: string) => {
        const dateTime = new Date().toISOString();
        if (this._useConsole) {
            console.log(`[${dateTime}] DEBUG: ${str}`);
        }
        else {
            const str_ = `[${dateTime}]  DEBUG  ${str}\n`;
            this._stream.write(str_);
        }
    };

}
