import type { FastifyPluginAsync } from 'fastify';

import {
  loginHandler,
  meHandler,
  profileHandler,
  registerHandler,
} from './auth.controller.js';

import { requireAuth } from './auth.guard.js';

import {
  authResponseSchema,
  errorResponseSchema,
  loginBodySchema,
  registerBodySchema,
  safeUserSchema,
  userProfileSchema,
} from './auth.schema.js';

import type {
  AuthResponse,
  ErrorResponse,
  LoginBody,
  RegisterBody,
} from './auth.types.js';

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post<{
    Body: RegisterBody;
    Reply: AuthResponse | ErrorResponse;
  }>(
    '/register',
    {
      schema: {
        body: registerBodySchema,
        response: {
          201: authResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    registerHandler,
  );

  app.post<{
    Body: LoginBody;
    Reply: AuthResponse | ErrorResponse;
  }>(
    '/login',
    {
      schema: {
        body: loginBodySchema,
        response: {
          200: authResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    loginHandler,
  );

  app.get(
    '/me',
    {
      preHandler: requireAuth,
      schema: {
        response: {
          200: safeUserSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    meHandler,
  );

  app.get(
    '/profile',
    {
      preHandler: requireAuth,
      schema: {
        response: {
          200: userProfileSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    profileHandler,
  );
};

export default authRoutes;