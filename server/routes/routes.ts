import homepage from '../../frontend/index.html';
import { login, logout, refresh, registerUser } from '../services/user/auth-service.ts';

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


  '/*': homepage,
};
