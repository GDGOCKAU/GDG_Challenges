import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  AuthServiceError,
  getCurrentUser,
  getUserProfile,
  loginUser,
  registerUser,
} from './auth.service.js';

import { getAuthPayload } from './auth.guard.js';

import type {
  LoginBody,
  RegisterBody,
} from './auth.types.js';

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  try {
    const result = await registerUser(
      request.server.db,
      request.body,
    );

    return reply.code(201).send(result);
  } catch (error) {
    if (error instanceof AuthServiceError) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: 'Internal server error',
    });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  try {
    const result = await loginUser(
      request.server.db,
      request.body,
    );

    return reply.code(200).send(result);
  } catch (error) {
    if (error instanceof AuthServiceError) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: 'Internal server error',
    });
  }
}

export async function meHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const payload = getAuthPayload(request);

  if (payload === null) {
    return reply.code(401).send({
      message: 'Unauthorized',
    });
  }

  try {
    const user = await getCurrentUser(
      request.server.db,
      payload.sub,
    );

    return reply.code(200).send(user);
  } catch (error) {
    if (error instanceof AuthServiceError) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: 'Internal server error',
    });
  }
}

export async function profileHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const payload = getAuthPayload(request);

  if (payload === null) {
    return reply.code(401).send({
      message: 'Unauthorized',
    });
  }

  try {
    const profile = await getUserProfile(
      request.server.db,
      payload.sub,
    );

    return reply.code(200).send(profile);
  } catch (error) {
    if (error instanceof AuthServiceError) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: 'Internal server error',
    });
  }
}