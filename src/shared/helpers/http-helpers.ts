import { AppError } from "../classes";
import { Http } from "../protocols/http";

export const badRequest = (error: AppError): Http.Response<AppError> => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: AppError): Http.Response<AppError> => ({
  statusCode: 500,
  body: new AppError({
    code: 500,
    message: "Sever Error, try again later",
    name: "ServerError",
  }),
});

export const ok = <T = any>(body: T): Http.Response<T> => ({
  statusCode: 200,
  body,
});

export const created = <T = any>(body: T): Http.Response<T> => ({
  statusCode: 201,
  body,
});
