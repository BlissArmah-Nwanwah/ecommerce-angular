import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { logout } from '../auth/auth.actions';
import { isLoggedIn } from '../auth/auth.selectors';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule, CommonModule, NgOptimizedImage, MatButtonModule,MatIconModule],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userName!: string;
  showNav: boolean = false;
  selectedProductCount: number = 0;
  dropdownVisible: boolean = false;
  isHovered: boolean = false;
  isAuthVisible: boolean = false;
  isLoggenIn$: Observable<boolean> = new Observable();
  isLoggenOut$: Observable<boolean> = new Observable();

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

  routeToCart() {
    this.selectedProductCount = this.productService.productCount;
    if (this.selectedProductCount >= 1) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/empty-cart']);
    }
  }

  getProductCount(): number {
    return this.productService.productCount;
  }

  routeToHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
