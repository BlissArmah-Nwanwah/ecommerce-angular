import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartProductData } from '../../services/product-data';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

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
  ],
})
export class CartComponent implements OnInit {
  public cartProducts: CartProductData[] = [];
  public totalAmount = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  public getCartProducts() {
    this.cartProducts = this.productService.getCartProducts();
    this.getTotalAmount();
  }

  public getTotalAmount() {
    this.totalAmount = this.cartProducts.reduce((total, product) => {
      const count = product.count ?? 0;
      const amount = parseFloat(product.price) * count || 0;
      return total + amount;
    }, 0);
  }

  public removeProduct(product: CartProductData): void {
    this.productService.removeProductFromCart(product);
    this.getCartProducts();
    if (!this.cartProducts.length) {
      this.router.navigateByUrl('/empty-cart');
    }
  }

  public incrementCount(id: string) {
    this.productService.incrementProductCount(id);
    this.getTotalAmount();
  }

  public decrementCount(id: string) {
    this.productService.decrementProductCount(id);
    this.getTotalAmount();
    if (this.cartProducts.length === 0) {
      this.router.navigate(['/empty-cart']);
    }
  }

  public redirectToHome() {
    this.router.navigateByUrl('');
  }

  public redirectToCheckout() {
    this.router.navigateByUrl('/checkout');
  }
}
