import homepage from '../../frontend/index.html';
import { login, logout, refresh, registerUser } from '../services/user/auth-service.ts';
import { checkAuth } from '../middleware/checkAuth.ts';
import { getAllTodos } from '../services/todo/todo-service.ts';

export const routes: Bun.Serve.Routes<string, string> = {
  // auth
  '/auth/register': {
    POST: registerUser,
  },
  '/auth/login': {
    POST: login,
  },
  '/auth/logout': logout,
  '/auth/refresh': refresh,

  //todos CRUD
  '/todo/all': (req) => checkAuth(req, getAllTodos),

  '/*': homepage,
};
