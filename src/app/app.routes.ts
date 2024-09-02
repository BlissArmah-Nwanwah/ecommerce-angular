import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './products/home/home.component';
import { EmptyCartComponent } from './products/empty-cart/empty-cart.component';
import { DetailsComponent } from './products/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./products/cart/cart.module').then((m) => m.cartRoutingModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'empty-cart', component: EmptyCartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];
