import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private readonly userService = inject(UserService);

  users: User[] = [];
  isLoading = false;
  deletingUserId: number | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.userService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (users) => (this.users = users),
        error: () => {
          this.errorMessage = 'No se pudieron cargar los usuarios.';
        },
      });
  }

  deleteUser(id: number): void {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      return;
    }

    this.errorMessage = '';
    this.deletingUserId = id;

    this.userService
      .delete(id)
      .pipe(finalize(() => (this.deletingUserId = null)))
      .subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar el usuario.';
        },
      });
  }
}
