import { Routes } from '@angular/router';
import { Layout } from './features/dashboard/layout/layout';
import { Home } from './features/dashboard/pages/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Users } from './features/pages/users/users/users';
import { UserForm } from './features/pages/users/user-form/user-form';


export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },

    {
        path: 'register',
        component: Register
    },

    {
        path: 'dashboard',
        component: Layout,
        children: [
            {
                path: 'users',
                component: Users,
                pathMatch: 'full'
            },
            {
                path: 'users/new',
                component: UserForm,
                data: { mode: 'create' }
            },
            {
                path: 'users/:id/edit',
                component: UserForm,
                data: { mode: 'edit' }
            },
            {
                path: 'users/:id',
                component: UserForm,
                data: { mode: 'view' }
            },
            {
                path: '',
                component: Home
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];
