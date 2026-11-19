import { defer, delay, map, Observable, of, throwError } from "rxjs";
import { AuthCredentials, AuthResponse } from "../models/auth";
import { NewUser, User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";

export class UserLocalRepository extends UserRepository {


    private readonly STORAGE_KEY = 'agendaflow_users';
    override register(user: NewUser): Observable<AuthResponse> {
        
        return defer(() => this.create(user)).pipe(
            delay(500),
            map(createdUser => this.createAuthResponse(createdUser))
        );
    }

    override login(credentials: AuthCredentials): Observable<AuthResponse> {
        const email = credentials.email.trim().toLowerCase();
        return defer(() => this.getAll()).pipe(
            delay(500),
            map(users => {
                const user = users.find(
                    candidate =>
                        candidate.email.trim().toLowerCase() === email &&
                        candidate.password === credentials.password
                );
                if (!user) {
                    throw new Error("Correo electrónico o contraseña incorrectos.");
                }

                return this.createAuthResponse(user);
            })
        );

    }

    override getAll(): Observable<User[]> {
        return of(this.getUsers());
    }
    override getById(id: number): Observable<User> {
        const user = this.getUsers().find(existingUser => existingUser.id === id);

        return user
            ? of(user)
            : throwError(() => new Error(`User with id ${id} not found`));
    }
    override create(user: NewUser): Observable<User> {
        const users = this.getUsers();
        const id = users.reduce((maxId, existingUser) => Math.max(maxId, existingUser.id), 0) + 1;
        const createdUser: User = { ...user, id };

        users.push(createdUser);
        this.saveUsers(users);

        return of(createdUser);
    }
    override delete(id: number): Observable<void> {
        const users = this.getUsers();
        const index = users.findIndex(existingUser => existingUser.id === id);

        if (index === -1) {
            return throwError(() => new Error(`User with id ${id} not found`));
        }

        users.splice(index, 1);
        this.saveUsers(users);

        return of(undefined);
    }

    override update(id: number, user: Partial<User>): Observable<User> {
        const users = this.getUsers();
        const index = users.findIndex(existingUser => existingUser.id === id);

        if (index === -1) {
            return throwError(() => new Error(`User with id ${id} not found`));
        }

        const updatedUser: User = { ...users[index], ...user, id };
        users[index] = updatedUser;
        this.saveUsers(users);

        return of(updatedUser);
    }

    private getUsers(): User[] {
        const data = localStorage.getItem(this.STORAGE_KEY);

        return data ? JSON.parse(data) as User[] : [];
    }

    private saveUsers(users: User[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    private createAuthResponse(user: User): AuthResponse {
        return {
            token: `mock-token-${crypto.randomUUID()}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}
