import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './products/home/home.component';
import { EmptyCartComponent } from './products/empty-cart/empty-cart.component';
import { DetailsComponent } from './products/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  {
    path: 'details/:id',
    component: DetailsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./products/cart/cart.module').then((m) => m.cartRoutingModule),
    canActivate: [AuthGuard]
  },
  { path: 'empty-cart', component: EmptyCartComponent,canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];
