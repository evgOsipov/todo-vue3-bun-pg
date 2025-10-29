import { Api } from './api.ts';
import type { ToDoGetAllResponse } from '../interfaces/api/todo.ts';

class TodoApi extends Api {
  public getAll() {
    return Api._get<ToDoGetAllResponse>('/todo/all');
  }
}

export const todoApi = new TodoApi();
