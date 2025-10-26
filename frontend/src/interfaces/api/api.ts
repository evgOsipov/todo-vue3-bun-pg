import type { AuthServerRequestBody, AuthServerRequestParams, AuthServerResponse } from './auth.ts';
import type { ToDoServerRequestBody, ToDoServerRequestParams, ToDoServerResponse } from './todo.ts';

export type ApiServerResponse =
  | AuthServerResponse
  | ToDoServerResponse;

export type ApiServerRequestParams =
  | AuthServerRequestParams
  | ToDoServerRequestParams;

export type ApiServerRequestBody =
  | AuthServerRequestBody
  | ToDoServerRequestBody;
