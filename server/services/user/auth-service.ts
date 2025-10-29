import bcrypt from 'bcrypt';

import type { CreateUserBody } from './interface/user.ts';
import { type User } from '../../models/user.ts';
import { pg } from '../../db/db.ts';
import { checkRefreshToken, generateTokens, validateRefreshToken } from '../token/token-service.ts';

const checkIsEmailValid = (email?: string): string | boolean => {
  if (!email) {
    return 'Email is required';
  }
  const testEmailRE = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!testEmailRE.test(email)) {
    return 'Email is incorrect';
  }
  return true;
};

const checkIsPasswordValid = (password?: string): string | boolean => {
  if (!password) {
    return 'Password is required';
  }
  const testPassRE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  if (!testPassRE.test(password)) {
    return 'Password is incorrect';
  }
  return true;
};

const checkIsUserValid = ({ email, password, name }: CreateUserBody): boolean | Response => {
  const isEmailValid = checkIsEmailValid(email);
  if (typeof isEmailValid === 'string') {
    return new Response(isEmailValid, {
      status: 400,
    });
  }

  const isPasswordValid = checkIsPasswordValid(password);
  if (typeof isPasswordValid === 'string') {
    return new Response(isPasswordValid, {
      status: 400,
    });
  }

  if (!/.{2,25}/.test(name)) {
    return new Response('Name should be from 2 to 25 characters long', {
      status: 400,
    });
  }
  return true;
};

export const addUserToDb = async (user: User): Promise<Required<User>> => {
  const users = await pg<Required<User>[]>`INSERT INTO users ${pg(user)} RETURNING id, email, name`;
  if (!users[0]) {
    throw new Error('Error adding a user');
  }
  return users[0];
};

export const checkUserInDb = async (email: string): Promise<Required<User> | false> => {
  const user = await pg<Required<User>[]>`SELECT *
                                          FROM users
                                          WHERE email = ${email}`;
  if (!user || !user[0]) {
    return false;
  }
  return user[0];
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 3);
};

export const setTokens = async (req: Bun.BunRequest, user: { name: string, email: string, id: number }) => {
  const tokens = await generateTokens({ ...user });
  const cookies = req.cookies;
  cookies.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 1000,
  });
  cookies.set('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 5 * 1000,
  });
}

export const registerUser = async (req: Bun.BunRequest): Promise<Response> => {
  const maybeUser = await req.json() as CreateUserBody;

  const isUserExist = await checkUserInDb(maybeUser.email);
  if (isUserExist) {
    return new Response(`User with email ${maybeUser.email} already exists`, {
      status: 400,
    });
  }

  const isUserValid = checkIsUserValid(maybeUser);
  if (typeof isUserValid !== 'boolean') {
    return isUserValid;
  }

  let user: Required<User>;
  try {
    user = await addUserToDb({
      email: maybeUser.email,
      password: await hashPassword(maybeUser.password),
      name: maybeUser.name,
    });
  } catch (err) {
    return new Response(`Error registering user: ${err}`, {
      status: 400,
    });
  }

  await setTokens(req, {
    email: user.email,
    name: user.name,
    id: user.id,
  });

  return new Response(JSON.stringify({
    email: user.email,
    name: user.name,
  }));
};

const checkIsPasswordCorrect = async (password: string, user: Required<User>): Promise<boolean> => {
  return bcrypt.compare(password, user.password);
};

export const login = async (req: Bun.BunRequest): Promise<Response> => {
  const maybeUser = await req.json() as CreateUserBody;

  const isUserExist = await checkUserInDb(maybeUser.email);
  if (!isUserExist) {
    return new Response(`User with email ${maybeUser.email} not exists`, {
      status: 400,
    });
  }

  const isPasswordCorrect = await checkIsPasswordCorrect(maybeUser.password, isUserExist);
  if (!isPasswordCorrect) {
    return new Response('Password is incorrect', {
      status: 400,
    });
  }

  await setTokens(req, {
    name: isUserExist.name,
    email: isUserExist.email,
    id: isUserExist.id,
  });

  return new Response(JSON.stringify({
    name: isUserExist.name,
    email: isUserExist.email,
  }));
};

export const logout = async (req: Bun.BunRequest): Promise<Response> => {
  const refreshToken = req.cookies.get('refreshToken');
  await pg`DELETE FROM tokens WHERE refresh_token=${refreshToken}`;
  req.cookies.delete('refreshToken');
  req.cookies.delete('accessToken');
  return new Response('OK');
}

export const refresh = async (req: Bun.BunRequest): Promise<Response> => {
  const refreshToken = req.cookies.get('refreshToken');
  if (!refreshToken) {
    return new Response('Error refreshing token', {
      status: 403,
    });
  }

  const userData = validateRefreshToken(refreshToken);
  const isTokenExist = await checkRefreshToken(refreshToken);
  if (!userData || !isTokenExist) {
    return new Response('Error refreshing token', {
      status: 403,
    });
  }

  if (typeof userData !== 'string' && 'name' in userData && 'email' in userData && 'id' in userData) {
    await setTokens(req, {
      name: userData.name,
      email: userData.email,
      id: userData.id,
    });
    return new Response('OK');
  }

  return new Response('Error refreshing token', {
    status: 403,
  });
}
