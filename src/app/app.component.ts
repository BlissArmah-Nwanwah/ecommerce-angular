import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, User } from './app.state';
import { AUTH_ACTIONS } from './auth/auth.actions';
import { selectAuthState } from './auth/auth.selectors';
import { LocalStorageService } from './services/localstorage.service';
import { cartProducts } from './products/products.selectors';
import { ProductData } from './services/product-data';
import { PRODUCT_ACTIONS } from './products/products.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'B-commerce';
  private authState = this.store.selectSignal(selectAuthState);
  private cartProducts = this.store.selectSignal(cartProducts);

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnload(): void {
    this.localStorageService.persistAuthState(this.authState());
    this.localStorageService.persistCartProducts(this.cartProducts());
  }

  ngOnInit(): void {
    const userProfile = this.localStorageService.getAuthState<User>();
    const savedCartProducts = this.localStorageService.getCartProducts<ProductData[]>();

    if (userProfile) {
      this.store.dispatch(AUTH_ACTIONS.updateAuthState(userProfile));
    }

    if (savedCartProducts) {
      this.store.dispatch(PRODUCT_ACTIONS.loadProductFromCart({ products: savedCartProducts }));
    }

    this.localStorageService.clearUserAndCart();
  }
}
