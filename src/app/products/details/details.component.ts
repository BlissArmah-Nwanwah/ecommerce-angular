import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductData } from '../../services/product-data';
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
  protected selectedProduct = this.store.selectSignal(selectedProduct);
  protected loading = this.store.selectSignal(isProductsLoading);

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}
  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.store.dispatch(PRODUCT_ACTIONS.loadSelectedProduct({ productId }));
  }

  public onProductSelectedToCart(product: ProductData | null): void {
    if (product) {
      this.store.dispatch(PRODUCT_ACTIONS.addProductToCart({ product }));
    }
  }
}
