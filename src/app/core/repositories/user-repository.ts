import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../models/auth';
import { NewUser, User } from '../models/user';

export abstract class UserRepository {

  abstract register(user: NewUser): Observable<AuthResponse>;

  abstract login(credentials: AuthCredentials): Observable<AuthResponse>;

  abstract getAll(): Observable<User[]>;

  abstract getById(id: number): Observable<User>;

  abstract create(user: NewUser): Observable<User>;

  abstract update(id: number, user: Partial<User>): Observable<User>;

  abstract delete(id: number): Observable<void>;

}

