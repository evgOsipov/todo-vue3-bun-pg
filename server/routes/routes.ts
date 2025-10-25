import homepage from '../../frontend/index.html';
import { registerUser } from '../services/user/register.ts';

export const routes: Bun.Serve.Routes<string, string> = {
  '/': homepage,
  '/api/register': {
    POST: registerUser,
  },
};
