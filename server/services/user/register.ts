import type { CreateUserBody } from './interface/user.ts';

export const registerUser = async (req: Bun.BunRequest): Promise<Response> => {
  const body = await req.json() as CreateUserBody;
  console.log(body);
  return new Response('OK');
};
