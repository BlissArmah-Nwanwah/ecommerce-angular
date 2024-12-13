import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductData } from '../../services/product-data';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Store } from '@ngrx/store';
import { cartProducts, cartProductTotal } from '../products.selectors';
import { PRODUCT_ACTIONS } from '../products.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [
    RouterLink,
    FooterComponent,
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    MatIconModule,
  ],
})
export class CartComponent {
  public cartProducts = this.store.selectSignal(cartProducts);
  public totalAmount = this.store.selectSignal(cartProductTotal);

  constructor(
    private router: Router,
    private store: Store
  ) {}

  public removeProduct(product: ProductData): void {
    this.store.dispatch(
      PRODUCT_ACTIONS.removeProductFromCart({ productId: product.id })
    );
    if (!this.cartProducts().length) {
      this.router.navigateByUrl('/empty-cart');
    }
  }

  public incrementCount(id: string) {
    this.store.dispatch(
      PRODUCT_ACTIONS.incrementProductCount({ productId: id })
    );
  }

  public decrementCount(id: string) {
    this.store.dispatch(
      PRODUCT_ACTIONS.decrementProductCount({ productId: id })
    );
    if (this.cartProducts().length === 0) {
      this.router.navigateByUrl('/empty-cart');
    }
  }
}
