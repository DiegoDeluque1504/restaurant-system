import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { categoriesRoutes } from './features/categories/categories.routes';
import { dishesRoutes } from './features/dishes/dishes.routes';
import { ordersRoutes } from './features/orders/orders.routes';
import { tablesRoutes } from './features/tables/tables.routes';
import { deliveriesRoutes } from './features/deliveries/deliveries.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'categories',
    children: categoriesRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'dishes',
    children: dishesRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    children: ordersRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'tables',
    children: tablesRoutes,
    canActivate: [authGuard]
  },
  {
    path: 'deliveries',
    children: deliveriesRoutes,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
