import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, User } from '../app.state';
import { AUTH_ACTIONS } from '../auth/auth.actions';
import { PRODUCT_ACTIONS } from '../products/products.actions';
import { selectAuthState } from '../auth/auth.selectors';
import { cartProducts } from '../products/products.selectors';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private store: Store<AppState>) {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  public removeItems(keys: string[]): void {
    keys.forEach(key => localStorage.removeItem(key));
  }

  public persistAuthState(authState: any): void {
    this.setItem('auth', authState);
  }

  public persistCartProducts(cartProducts: any): void {
    this.setItem('cart', cartProducts);
  }

  public getAuthState<T>(): T | null {
    return this.getItem<T>('auth');
  }

  public getCartProducts<T>(): T | null {
    return this.getItem<T>('cart');
  }

  public clearUserAndCart(): void {
    this.removeItems(['auth', 'cart']);
  }

  private authState = this.store.selectSignal(selectAuthState);
  private cartProducts = this.store.selectSignal(cartProducts);

  public persistState(): void {
    this.persistAuthState(this.authState());
    this.persistCartProducts(this.cartProducts());
  }

  public initializeState(): void {
    const userProfile = this.getAuthState<User>();
    const savedCartProducts = this.getCartProducts<any[]>();

    if (userProfile) {
      this.store.dispatch(AUTH_ACTIONS.updateAuthState(userProfile));
    }

    if (savedCartProducts) {
      this.store.dispatch(
        PRODUCT_ACTIONS.loadProductFromCart({ products: savedCartProducts })
      );
    }

    this.clearUserAndCart();
  }
}
