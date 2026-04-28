import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule)
  },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'inventario',
        loadChildren: () => import('./inventario/inventario.module').then((m) => m.InventarioModule)
      },
      {
        path: 'tracking',
        loadChildren: () => import('./tracking/tracking.module').then((m) => m.TrackingModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
