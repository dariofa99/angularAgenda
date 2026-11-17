import { inject, Injectable } from '@angular/core';
import { UserRepository } from '../repositories/user-repository';
import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../models/auth';
import { NewUser, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService  {
  private userRepository = inject(UserRepository);

  register(user: NewUser): Observable<AuthResponse> {
    return this.userRepository.register(user);
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.userRepository.login(credentials);
  }

  getAll(): Observable<User[]> {
    return this.userRepository.getAll();
  }

  getById(id: number): Observable<User> {
    return this.userRepository.getById(id);
  }

  create(user: NewUser): Observable<User> {
    return this.userRepository.create(user);
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.userRepository.update(id, user);
  }

  delete(id: number): Observable<void> {
    return this.userRepository.delete(id);
  }

}
