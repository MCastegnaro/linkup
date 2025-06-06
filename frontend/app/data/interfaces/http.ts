/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpMethod = "post" | "get" | "put" | "delete" | "patch";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
  headers?: any;
};

export interface HttpClient<R = any> {
  request: (params: HttpRequest) => Promise<HttpResponse<R>>;
}
