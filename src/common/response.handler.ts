import express from 'express';
import { ApiError } from './api.error';
import { ResponseDto } from '../domain.types/miscellaneous/response.dto';
import { Logger } from './logger';
import { InputValidationError } from './error.handler';

export class ResponseHandler {
  constructor() { }

  public static success(
    request: express.Request,
    response: express.Response,
    message: string,
    httpCode: number,
    data?: any,
    logDataObject = true
  ) {

    const ips = [
      request.header('x-forwarded-for') || request.socket.remoteAddress
    ];

    const responseObject: ResponseDto = {
      Status: "success",
      Message: message,
      HttpCode: httpCode ?? 200,
      Data: data ?? null,
      Trace: null,
      Context: request ? request.context : null,
      Request: {
        Method: request ? request.method : null,
        Host: request ? request.hostname : null,
        Body: request ? request.body : null,
        Headers: request ? request.headers : null,
        Url: request ? request.originalUrl : null,
        Params: request ? request.params : null,
      },
      ClientIps: request && request.ips.length > 0 ? request.ips : ips,
      APIVersion: process.env.API_VERSION,
      ServiceVersion: process.env.SERVICE_VERSION,
    };

    if (process.env.NODE_ENV !== 'test') {
      if (!logDataObject) {
        responseObject.Data = null;
      }
      Logger.instance().log(JSON.stringify(responseObject, null, 2));
    }

    delete responseObject.Request;
    delete responseObject.Trace;

    response.status(httpCode).send(responseObject);
  }

  public static failure(
    request: express.Request,
    response: express.Response,
    message?: string,
    httpErrorCode?: number,
    error?: Error
  ) {
    const msg = error
      ? error.message
      : message
        ? message
        : "An error has occurred.";

    const ips = [
      request.header('x-forwarded-for') || request.socket.remoteAddress
    ];

    const errorStack = error ? error.stack : '';
    const tmp = errorStack?.split('\n');
    const trace_path = tmp?.map(x => x.trim());

    const responseObject: ResponseDto = {
      Status: "failure",
      Message: msg,
      HttpCode: httpErrorCode ? httpErrorCode : 500,
      Trace: trace_path,
      Context: request ? request.context : null,
      Request: {
        Method: request ? request.method : null,
        Host: request ? request.hostname : null,
        Body: request ? request.body : null,
        Headers: request ? request.headers : null,
        Url: request ? request.originalUrl : null,
        Params: request ? request.params : null,
      },
      ClientIps: request && request.ips.length > 0 ? request.ips : ips,
      APIVersion: process.env.API_VERSION,
      ServiceVersion: process.env.SERVICE_VERSION,
    };

    //Sanitize response: Don't send request and trace related info in response, only use it for logging
    delete responseObject.Request;
    delete responseObject.Trace;

    response.status(httpErrorCode).send(responseObject);
  }

  static handleError(
    request: express.Request,
    response: express.Response,
    error: Error
  ) {
    if (error instanceof InputValidationError) {
      const validationError = error as InputValidationError;
      ResponseHandler.failure(request, response, validationError.message, validationError.httpErrorCode, error);
    }
    else
      if (error instanceof ApiError) {
        var err = error as ApiError;
        ResponseHandler.failure(request, response, err.message, err.Code, error);
      } else {
        ResponseHandler.failure(request, response, error.message, 400, error);
      }
  }
}
