import { User } from './user';

export interface AuthCredentials {
  email: string;
  password: string;
}

export type AuthenticatedUser = Pick<User, 'id' | 'name' | 'email'>;

export interface AuthResponse {
  token: string;
  user: AuthenticatedUser;
}
