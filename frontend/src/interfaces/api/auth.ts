export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthRegisterBody {
  email: string;
  password: string;
  name: string;
}

export type AuthLoginResponse = {
  name: string;
  email: string;
};
export type AuthRegisterResponse = {
  name: string;
  email: string;
};

export type AuthLogoutResponse = string;
export type AuthRefreshResponse = string;

export type AuthServerRequestParams = string;

export type AuthServerResponse =
  | AuthLoginResponse
  | AuthRegisterResponse
  | AuthLogoutResponse
  | AuthRefreshResponse;

export type AuthServerRequestBody =
  | AuthLoginBody
  | AuthRegisterBody;
