import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from '../../../../core/services/user';
import { NewUser, User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  mode: 'create' | 'edit' | 'view' = 'create';
  userId: number | null = null;
  name = '';
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  get isReadOnly(): boolean {
    return this.mode === 'view';
  }

  ngOnInit(): void {
    const routeMode = this.route.snapshot.data['mode'];
    this.mode = routeMode === 'edit' || routeMode === 'view' ? routeMode : 'create';

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const parsedId = Number(id);
      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        this.errorMessage = 'El identificador del usuario no es válido.';
        return;
      }

      this.userId = parsedId;
      this.loadUser(parsedId);
    }
  }

  save(): void {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.mode === 'edit') {
      if (this.userId === null) {
        this.isLoading = false;
        this.errorMessage = 'No se encontró el usuario que deseas editar.';
        return;
      }

      const changes: Partial<User> = {
        name: this.name.trim(),
        email: this.email.trim().toLowerCase(),
      };

      this.userService
        .update(this.userId, changes)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => void this.router.navigate(['/dashboard/users']),
          error: () => {
            this.errorMessage = 'No se pudo actualizar el usuario.';
          },
        });
      return;
    }

    const newUser: NewUser = {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
    };

    this.userService
      .create(newUser)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => void this.router.navigate(['/dashboard/users']),
        error: () => {
          this.errorMessage = 'No se pudo crear el usuario.';
        },
      });
  }

  private loadUser(id: number): void {
    this.isLoading = true;

    this.userService
      .getById(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (user) => {
          this.name = user.name;
          this.email = user.email;
        },
        error: () => {
          this.errorMessage = 'No se encontró el usuario solicitado.';
        },
      });
  }
}
