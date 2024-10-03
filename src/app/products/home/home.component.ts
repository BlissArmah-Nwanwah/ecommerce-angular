import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ProductData, CartProductData } from '../../services/product-data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Store } from '@ngrx/store';
import { PRODUCT_ACTIONS } from '../products.actions';
import { allProducts, isProductsLoading } from '../products.selectors';
import { CreateproductmodalComponent } from '../createproductmodal/createproductmodal.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class HomeComponent implements OnInit {
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public newProducts$!: Observable<ProductData[]>;
  public searchForm!: FormGroup;
  public products = this.store.selectSignal(allProducts);
  public currentPage = 1;
  public itemsPerPage = 8;
  public loading = this.store.selectSignal(isProductsLoading);
  public productLength = 0;
  public durationInSeconds = 2;
  public toggleModal = false;

  public constructor(
    private router: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(PRODUCT_ACTIONS.loadProduct());
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });
    this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        this.store.dispatch(PRODUCT_ACTIONS.searchProducts({ searchTerm }));
      });
  }

  public onToggleCreatProductModal() {
    this.toggleModal = !this.toggleModal;
  }

  public onProductSelectedToCart(product: CartProductData): void {
    this.productService.setSelectedProductToCart(product);
    this.openSnackBar('Item added to cart', 'Close');
  }

  public onProductSelectDetail(product: CartProductData): void {
    this.router.navigateByUrl(`/details/${product.id}`);
  }

  public handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
