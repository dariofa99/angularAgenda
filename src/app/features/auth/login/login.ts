import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authFacade
      .login({ email: this.email, password: this.password })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/dashboard']);
        },
        error: (error: unknown) => {
          this.errorMessage =
            error instanceof Error
              ? error.message
              : 'No se pudo iniciar sesión. Inténtalo de nuevo.';
        },
      });
  }
}
