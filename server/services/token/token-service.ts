import jwt from 'jsonwebtoken';

import { jwtConfig } from '../../config.ts';
import { pg } from '../../db/db.ts';
import type { Token } from '../../models/token.ts';

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, jwtConfig.accessSecret);
  } catch (err) {
    return null;
  }
}

export const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret);
  } catch (err) {
    return null;
  }
}

export const checkRefreshToken = async (token: string) => {
  try {
    const isFound = await pg<Token[]>`SELECT * FROM tokens WHERE refresh_token=${token}`;
    return isFound?.length > 0;
  } catch (err) {
    return false;
  }
}

export const generateTokens = async (payload: { name: string, email: string, id: number }) => {
  const accessToken = jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: '5s',
  });
  const refreshToken = jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: '5m',
  });
  await saveToken(payload.id, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

export const saveToken = async (userId: number, refreshToken: string) => {
  const tokenData = await pg`select *
                             from tokens
                             where user_id = ${userId}`;
  if (tokenData.length > 0) {
    await pg`UPDATE tokens
       SET refresh_token=${refreshToken}
       WHERE user_id=${userId}`;
    return;
  }
  const token = {
    user_id: userId,
    refresh_token: refreshToken,
  };
  await pg`INSERT INTO tokens ${pg(token)}`;
};
