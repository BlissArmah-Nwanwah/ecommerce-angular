import { Store } from '@ngrx/store';
import { Component, Signal } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { EMPTY, catchError } from 'rxjs';
import { ProductData, cartProductData } from '../../services/product-data';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { selectedProduct } from '../products.selectors';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  imports: [CommonModule, FooterComponent, RouterLink, NavbarComponent],
})
export class DetailsComponent {
  selectedProduct = this.store.selectSignal(selectedProduct);
  loading: boolean = false;
  selectedSize: string = '';
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  // ngOnInit(): void {
  //   // this.getSingleProduct();
  //   this.selectedProduct = this.store.selectSignal(selectedProduct);
  // }

  // getSingleProduct() {
  //   this.loading = true;
  //   this.productService
  //     .getSelectedProduct(this.id)
  //     .pipe(catchError(() => EMPTY))
  //     .subscribe((products) => {
  //       this.selectedProduct = products;
  //     });
  // }

  onProductSelectedToCart(product: cartProductData | null): void {
    if (product) this.productService.setSelectedProductToCart(product);
  }

  changeBgColor(size: string) {
    this.selectedSize = size;
    alert('Selected Size: ' + this.selectedSize);
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }
}
