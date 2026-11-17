import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { NewUser } from '../../../core/models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const user: NewUser = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authFacade
      .register(user)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          void this.router.navigate(['/dashboard']);
        },
        error: (error: unknown) => {
          this.errorMessage =
            error instanceof Error
              ? error.message
              : 'No se pudo completar el registro. Inténtalo de nuevo.';
        },
      });
  }
}
