import {Component, computed, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {ItemCardComponent} from '../item-card/item-card.component';
import {
  ProductData,
  ProductActionEvent,
} from '../../services/product-data';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component';
import {Store} from '@ngrx/store';
import {PRODUCT_ACTIONS} from '../products.actions';
import {allProducts, isProductsLoading} from '../products.selectors';
import {CreateproductmodalComponent} from '../createproductmodal/createproductmodal.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CustomInputFieldComponent} from '../../auth/custom-input-field/custom-input-field.component';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {SnackbarService} from "../../services/snackbar.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NavbarComponent,
    ItemCardComponent,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
    CommonModule,
    CreateproductmodalComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    CustomInputFieldComponent,
  ],
})
export class HomeComponent implements OnInit {
  public searchControl = new FormControl('');
  public searchTerm = signal('');
  public products = this.store.selectSignal(allProducts);
  public loading = this.store.selectSignal(isProductsLoading);


  public filteredProducts = computed(() => {
    const searchValue = this.searchTerm().toLowerCase();
    return this.products().filter(product =>
      product.title.toLowerCase().includes(searchValue)
    );
  });

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(PRODUCT_ACTIONS.loadProduct());
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string | null) => {
        this.searchTerm.set(value || '');
      });
    console.log('kkk:', this.loading())
  }

  public onToggleCreatProductModal() {
    this.modalService.openModal('createProductModal');
  }

  public onProductAction(event: ProductActionEvent): void {
    if (event.type === 'detail') {
      this.onProductSelectDetail(event.data);
    } else if (event.type === 'addToCart') {
      this.onProductSelectedToCart(event.data);
    }
  }

  public onProductSelectedToCart(product: ProductData): void {
    this.store.dispatch(PRODUCT_ACTIONS.addProductToCart({product}));
    this.snackbarService.openSnackBar('Item added to cart', 'Close');
  }

  public onProductSelectDetail(product: ProductData): void {
    this.router.navigateByUrl(`/details/${product.id}`);
  }

}
