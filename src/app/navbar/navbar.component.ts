import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AUTH_ACTIONS } from '../auth/auth.actions';
import { isLoggedIn } from '../auth/auth.selectors';
import { MatIconModule } from '@angular/material/icon';
import { atLeastOneCartItem } from '../services/constant';
import {cartProductCount} from "../products/products.selectors";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    RouterModule,
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
  ],
})
export class NavbarComponent implements OnInit {
  public selectedProductCount = this.store.selectSignal(cartProductCount)
  public isLoggenIn$ = this.store.pipe(select(isLoggedIn));

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
  }


  public routeToCart() {
    if (this.selectedProductCount() >= atLeastOneCartItem) {
      this.router.navigateByUrl('/cart');
    } else {
      this.router.navigateByUrl('/empty-cart');
    }
  }

  public logout() {
    this.store.dispatch(AUTH_ACTIONS.logOut());
  }
}
