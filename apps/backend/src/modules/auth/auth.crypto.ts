import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';

import type {
  AuthTokenPayload,
  UserRole,
} from './auth.types.js';

const scrypt = promisify(scryptCallback);

const PASSWORD_KEY_LENGTH = 64;
const TOKEN_LIFETIME_SECONDS = 60 * 60;

// Temporary secret because we are only allowed to modify the auth module.
// Tokens will become invalid whenever the backend restarts.
const tokenSecret = randomBytes(32);

export async function hashPassword(
  password: string,
): Promise<string> {
  const salt = randomBytes(16);

  const derivedKey = (await scrypt(
    password,
    salt,
    PASSWORD_KEY_LENGTH,
  )) as Buffer;

  return [
    'scrypt',
    salt.toString('hex'),
    derivedKey.toString('hex'),
  ].join('$');
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const parts = storedHash.split('$');

  if (parts.length !== 3) {
    return false;
  }

  const [algorithm, saltHex, keyHex] = parts;

  if (
    algorithm !== 'scrypt' ||
    saltHex === undefined ||
    keyHex === undefined
  ) {
    return false;
  }

  const salt = Buffer.from(saltHex, 'hex');
  const storedKey = Buffer.from(keyHex, 'hex');

  if (storedKey.length === 0) {
    return false;
  }

  const derivedKey = (await scrypt(
    password,
    salt,
    storedKey.length,
  )) as Buffer;

  if (derivedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
}

function sign(data: string): string {
  return createHmac('sha256', tokenSecret)
    .update(data)
    .digest('base64url');
}

export function createAccessToken(
  userId: string,
  role: UserRole,
): string {
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(
    JSON.stringify({
      alg: 'HS256',
      typ: 'JWT',
    }),
  ).toString('base64url');

  const payload: AuthTokenPayload = {
    sub: userId,
    role,
    iat: now,
    exp: now + TOKEN_LIFETIME_SECONDS,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
  ).toString('base64url');

  const unsignedToken = `${header}.${encodedPayload}`;
  const signature = sign(unsignedToken);

  return `${unsignedToken}.${signature}`;
}

export function verifyAccessToken(
  token: string,
): AuthTokenPayload | null {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, providedSignature] = parts;

  if (
    header === undefined ||
    payload === undefined ||
    providedSignature === undefined
  ) {
    return null;
  }

  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = sign(unsignedToken);

  const providedSignatureBuffer = Buffer.from(providedSignature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    providedSignatureBuffer.length !==
    expectedSignatureBuffer.length
  ) {
    return null;
  }

  if (
    !timingSafeEqual(
      providedSignatureBuffer,
      expectedSignatureBuffer,
    )
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as AuthTokenPayload;

    const now = Math.floor(Date.now() / 1000);

    if (
      typeof decoded.sub !== 'string' ||
      typeof decoded.role !== 'string' ||
      typeof decoded.iat !== 'number' ||
      typeof decoded.exp !== 'number' ||
      decoded.exp <= now
    ) {
      return null;
    }

    if (
      decoded.role !== 'student' &&
      decoded.role !== 'member' &&
      decoded.role !== 'admin'
    ) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}