import { Api } from './api.ts';
import type {
  AuthLoginBody,
  AuthLoginResponse,
  AuthLogoutResponse,
  AuthRefreshResponse,
  AuthRegisterBody,
  AuthRegisterResponse,
} from '../interfaces/api/auth.ts';

class AuthApi extends Api {
  public async login(body: AuthLoginBody): Promise<AuthLoginResponse> {
    return Api._post<AuthLoginResponse, AuthLoginBody>('/auth/login', body);
  }

  public async register(body: AuthRegisterBody): Promise<AuthRegisterResponse> {
    return Api._post<AuthRegisterResponse, AuthRegisterBody>('/auth/register', body);
  }

  public async logout() {
    return Api._get<AuthLogoutResponse>('/auth/logout');
  }

  public async refresh() {
    return Api._get<AuthRefreshResponse>('/auth/refresh');
  }
}

export const authApi = new AuthApi();
