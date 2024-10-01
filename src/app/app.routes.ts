import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './products/home/home.component';
import { EmptyCartComponent } from './products/empty-cart/empty-cart.component';
import { DetailsComponent } from './products/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'details/:id',
    component: DetailsComponent,
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
    component: EmptyCartComponent,
    canActivate: [authGuard],
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
];
