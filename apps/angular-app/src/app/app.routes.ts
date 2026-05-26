import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { AppCallbackComponent } from './callback/callback';
import { LoginComponent } from './login/login';
import { requireAuthGuard } from './guards/require-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'callback',
    component: AppCallbackComponent,
  },
  {
    path: '',
    component: Layout,
    canActivate: [requireAuthGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
    ],
  },
];
