import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartinfoComponent } from './cartinfo/cartinfo.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    // children: [{ path: 'cart-info', component: CartinfoComponent }],
  },
  {
    path: 'cart-info',
    component: CartinfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class cartRoutingModule {}
