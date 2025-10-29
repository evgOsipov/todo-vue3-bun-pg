import { validateAccessToken } from '../services/token/token-service.ts';
import moment from 'moment';

const transformToTimestamp = (date: number) => {
  return moment.unix(date).valueOf();
}

export const checkAuth = async (
  request: Bun.BunRequest,
  cb: (request: Bun.BunRequest,
  ) => Promise<Response>,
): Promise<Response> => {
  const accessToken = request.cookies.get('accessToken');
  if (!accessToken) {
    return new Response('Access token expired', {
      status: 401,
    });
  }
  const userInfo = validateAccessToken(accessToken);
  if (!userInfo || transformToTimestamp(userInfo?.exp) < Date.now()) {
    return new Response('Access token expired', {
      status: 401,
    });
  }

  return cb(request);
};
