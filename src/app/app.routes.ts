import {Routes} from '@angular/router';
import {authGuard} from './guard/auth.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent)},
  {path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then((m) => m.SignupComponent)},
  {
    path: 'home', loadComponent: () => import('./products/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./products/details/details.component').then((m) => m.DetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./products/cart/cart.module').then((m) => m.CartRoutingModule),
    canActivate: [authGuard],
  },
  {
    path: 'empty-cart',
    loadComponent: () => import('./products/empty-cart/empty-cart.component').then((m) => m.EmptyCartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'checkout', loadComponent: () => import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
    canActivate: [authGuard]
  },
];
