import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../models/auth';
import { NewUser } from '../models/user';
import { UserService } from '../services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly userService = inject(UserService);

  register(user: NewUser): Observable<AuthResponse> {
    const normalizedUser = { ...user, email: user.email.trim().toLowerCase() };

    return this.userService
      .register(normalizedUser)
      .pipe(

        tap((response) => this.storeToken(response))
        
      );
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.userService
      .login(credentials)
      .pipe(
        tap((response) => this.storeToken(response))
      );
  }

  private storeToken(response: AuthResponse): void {
    sessionStorage.setItem('auth_token', response.token);
  }
}
