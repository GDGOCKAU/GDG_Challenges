export const registerBodySchema = {
  type: 'object',
  additionalProperties: false,
  required: ['username', 'email', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
    },
  },
} as const;

export const loginBodySchema = {
  type: 'object',
  additionalProperties: false,
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
    },
  },
} as const;

export const safeUserSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'username', 'email', 'role', 'createdAt'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    role: {
      type: 'string',
      enum: ['student', 'member', 'admin'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
} as const;

export const userProfileSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'id',
    'username',
    'email',
    'role',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    role: {
      type: 'string',
      enum: ['student', 'member', 'admin'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
} as const;

export const authResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['user', 'token'],
  properties: {
    user: safeUserSchema,
    token: {
      type: 'string',
    },
  },
} as const;

export const errorResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['message'],
  properties: {
    message: {
      type: 'string',
    },
  },
} as const;