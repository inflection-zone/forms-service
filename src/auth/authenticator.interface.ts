import express from 'express';
import { AuthResult } from './auth.types';

export interface IAuthenticator {

    authenticateUser(request: express.Request) : Promise<AuthResult>;

    authenticateClient(request: express.Request) : Promise<AuthResult>;

}
