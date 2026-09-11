export type UserRole = 'student' | 'member' | 'admin';

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SafeUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  user: SafeUser;
  token: string;
}

export interface ErrorResponse {
  message: string;
}