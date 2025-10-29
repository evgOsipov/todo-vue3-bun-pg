interface TodoServerItem {
  id: string;
  task: string;
  status: string;
  expireDate: string;
}

export type ToDoGetAllResponse = TodoServerItem[];

export type ToDoServerResponse =
  | ToDoGetAllResponse;

export type ToDoServerRequestParams = string;

export type ToDoServerRequestBody = string;
