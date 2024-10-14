import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../services/product.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {AUTH_ACTIONS } from '../auth/auth.actions';
import {isLoggedIn} from '../auth/auth.selectors';
import {MatIconModule} from '@angular/material/icon';

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
  public selectedProductCount = 0;
  public isLoggenIn$ = new Observable<boolean>();

  constructor(
    private router: Router,
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    this.selectedProductCount = this.productService.productCount;
  }

  ngOnInit(): void {
    this.getProductCount();
    this.isLoggenIn$ = this.store.pipe(select(isLoggedIn));
  }

  public routeToCart() {
    this.selectedProductCount = this.productService.productCount;
    if (this.selectedProductCount >= 1) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/empty-cart']);
    }
  }

  public getProductCount(): number {
    return this.productService.productCount;
  }

  public routeToHome() {
    this.router.navigate(['/home']);
  }

  public logout() {
    this.store.dispatch(AUTH_ACTIONS.logOut());
  }
}
