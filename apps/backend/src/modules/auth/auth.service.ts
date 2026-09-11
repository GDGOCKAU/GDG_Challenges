import { eq, or } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { users } from '../users/users.table.js';

import {
  createAccessToken,
  hashPassword,
  verifyPassword,
} from './auth.crypto.js';

import type {
  AuthResponse,
  LoginBody,
  RegisterBody,
  SafeUser,
  UserProfile,
} from './auth.types.js';

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

function toSafeUser(user: {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'member' | 'admin';
  createdAt: Date;
}): SafeUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
  };
}

function toUserProfile(user: {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'member' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}): UserProfile {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function registerUser(
  db: PostgresJsDatabase,
  input: RegisterBody,
): Promise<AuthResponse> {
  const username = input.username.trim();
  const email = input.email.trim().toLowerCase();

  const [existingUser] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
    })
    .from(users)
    .where(
      or(
        eq(users.email, email),
        eq(users.username, username),
      ),
    )
    .limit(1);

  if (existingUser !== undefined) {
    if (existingUser.email === email) {
      throw new AuthServiceError(
        'Email is already registered',
        409,
      );
    }

    throw new AuthServiceError(
      'Username is already taken',
      409,
    );
  }

  const passwordHash = await hashPassword(input.password);

  const [createdUser] = await db
    .insert(users)
    .values({
      username,
      email,
      passwordHash,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

  if (createdUser === undefined) {
    throw new Error('Failed to create user');
  }

  const safeUser = toSafeUser(createdUser);

  return {
    user: safeUser,
    token: createAccessToken(
      safeUser.id,
      safeUser.role,
    ),
  };
}

export async function loginUser(
  db: PostgresJsDatabase,
  input: LoginBody,
): Promise<AuthResponse> {
  const email = input.email.trim().toLowerCase();

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      passwordHash: users.passwordHash,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user === undefined) {
    throw new AuthServiceError(
      'Invalid email or password',
      401,
    );
  }

  const passwordIsCorrect = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (!passwordIsCorrect) {
    throw new AuthServiceError(
      'Invalid email or password',
      401,
    );
  }

  const safeUser = toSafeUser(user);

  return {
    user: safeUser,
    token: createAccessToken(
      safeUser.id,
      safeUser.role,
    ),
  };
}

export async function getCurrentUser(
  db: PostgresJsDatabase,
  userId: string,
): Promise<SafeUser> {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user === undefined) {
    throw new AuthServiceError(
      'Unauthorized',
      401,
    );
  }

  return toSafeUser(user);
}

export async function getUserProfile(
  db: PostgresJsDatabase,
  userId: string,
): Promise<UserProfile> {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user === undefined) {
    throw new AuthServiceError(
      'Unauthorized',
      401,
    );
  }

  return toUserProfile(user);
}