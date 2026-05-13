import type { IncomingMessage, ServerResponse } from "http";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Req = IncomingMessage;
export type Res = ServerResponse;

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
