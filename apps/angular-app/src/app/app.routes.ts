import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { AppCallbackComponent } from './callback/callback';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
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
  {
    path: 'callback',
    component: AppCallbackComponent,
  },
];
