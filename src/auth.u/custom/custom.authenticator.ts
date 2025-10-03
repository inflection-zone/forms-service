// import express from 'express';
// import jwt from 'jsonwebtoken';
// import { logger } from '../../logger/logger';
// import { AuthenticationResult } from '../../auth/auth.types';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';

// import { Loader } from '../../startup/loader';
// import { IAuthenticator } from '../authenticator.interface';
// import { CurrentUser } from '../../domain.types/miscellaneous/current.user';

// //////////////////////////////////////////////////////////////

// export class CustomAuthenticator implements IAuthenticator {

//     _clientService: ApiClientService = null;

//     constructor() {
//         this._clientService = Loader.Container.resolve(ApiClientService);
//     }

//     public authenticateUser = async (
//         request: express.Request
//     ): Promise<AuthenticationResult> => {
//         try {
//             var res: AuthenticationResult = {
//                 Result        : true,
//                 Message       : 'Authenticated',
//                 HttpErrorCode : 200,
//             };

//             const authHeader = request.headers['authorization'];
//             const token = authHeader && authHeader.split(' ')[1];

//             if (token == null) {
//                 var IsPrivileged = request.currentClient.IsPrivileged as boolean;
//                 if (IsPrivileged) {
//                     return res;
//                 }
                
//                 res = {
//                     Result        : false,
//                     Message       : 'Unauthorized user access',
//                     HttpErrorCode : 401,
//                 };
//                 return res;
//             }

//             jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (error, user) => {
//                 if (error) {
//                     res = {
//                         Result        : false,
//                         Message       : 'Forebidden user access',
//                         HttpErrorCode : 403,
//                     };
//                     return res;
//                 }
//                 request.currentUser = user as CurrentUser;
//             });
            
//         } catch (err) {
//             logger.error(JSON.stringify(err, null, 2));
//             res = {
//                 Result        : false,
//                 Message       : 'Error authenticating user',
//                 HttpErrorCode : 401,
//             };
//         }
//         return res;
//     };

//     public authenticateClient = async (request: express.Request): Promise<AuthenticationResult> => {
//         try {
//             var res: AuthenticationResult = {
//                 Result        : true,
//                 Message       : 'Authenticated',
//                 HttpErrorCode : 200,
//             };
//             let apiKey: string = request.headers['x-api-key'] as string;

//             if (!apiKey) {
//                 res = {
//                     Result        : false,
//                     Message       : 'Missing API key for the client',
//                     HttpErrorCode : 401,
//                 };
//                 return res;
//             }
//             apiKey = apiKey.trim();

//             const client: CurrentClient = await this._clientService.isApiKeyValid(apiKey);
//             if (!client) {
//                 res = {
//                     Result        : false,
//                     Message       : 'Invalid API Key: Forebidden access',
//                     HttpErrorCode : 403,
//                 };
//                 return res;
//             }
//             request.currentClient = client;
            
//         } catch (err) {
//             Logger.instance().log(JSON.stringify(err, null, 2));
//             res = {
//                 Result        : false,
//                 Message       : 'Error authenticating client',
//                 HttpErrorCode : 401,
//             };
//         }
//         return res;
//     };

// }
