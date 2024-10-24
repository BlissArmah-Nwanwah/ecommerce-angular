import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartProductData } from '../../services/product-data';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { isProductsLoading, selectedProduct } from '../products.selectors';
import { PRODUCT_ACTIONS } from '../products.actions';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  imports: [
    CommonModule,
    FooterComponent,
    RouterLink,
    NavbarComponent,
    LoaderComponent,
  ],
})
export class DetailsComponent implements OnInit {
  public selectedProduct = this.store.selectSignal(selectedProduct);
  public loading = this.store.selectSignal(isProductsLoading);
  public selectedSize = '';
  public id!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.store.dispatch(
      PRODUCT_ACTIONS.loadSelectedProduct({ productId: this.id })
    );
  }

  public onProductSelectedToCart(product: CartProductData | null): void {
    if (product) {
      this.productService.setSelectedProductToCart(product);
    }
  }

}
