import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import { verifyAccessToken } from './auth.crypto.js';

import type {
  AuthTokenPayload,
} from './auth.types.js';

export function getAuthPayload(
  request: FastifyRequest,
): AuthTokenPayload | null {
  const authorization = request.headers.authorization;

  if (authorization === undefined) {
    return null;
  }

  const [scheme, token] = authorization.split(' ');

  if (
    scheme !== 'Bearer' ||
    token === undefined ||
    token.length === 0
  ) {
    return null;
  }

  return verifyAccessToken(token);
}

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const payload = getAuthPayload(request);

  if (payload === null) {
    await reply.code(401).send({
      message: 'Unauthorized',
    });
  }
}