import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { cartProductData } from '../../services/product-data';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [RouterLink, FooterComponent, NavbarComponent,CommonModule,RouterOutlet],
})
export class CartComponent implements OnInit {
  cartProducts: cartProductData[] = [];
  totalAmount: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartProducts = this.productService.getCartProducts();
    this.TotalAmount();
  }

  TotalAmount() {
    this.totalAmount = this.cartProducts.reduce((total, product) => {
      // Use optional chaining to access product.count safely
      const count = product.count ?? 0;
      // Convert product.price.amount to a number using parseFloat or Number function
      const amount = parseFloat(product.price) * count || 0; // Use parseFloat to handle cases where product.price.amount is not a valid number
      return total + amount;
    }, 0);
  }

  removeProduct(product: cartProductData): void {
    this.productService.removeProductFromCart(product); // Remove product from cart
    this.getCartProducts(); // Refresh cart products
    if (this.cartProducts.length === 0) {
      this.router.navigate(['/empty-cart']);
    }
  }

  incrementCount(id: string) {
    this.productService.incrementProductCount(id);
    this.TotalAmount();
  }

  decrementCount(id: string) {
    this.productService.decrementProductCount(id);
    this.TotalAmount();
    if (this.cartProducts.length === 0) {
      this.router.navigate(['/empty-cart']);
    }
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
