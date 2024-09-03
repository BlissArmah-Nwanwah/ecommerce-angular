import { SearchService } from './../../services/search.service';
import {
  Component,
  ElementRef,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ProductData, cartProductData } from '../../services/product-data';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Store } from '@ngrx/store';
import { PRODUCT_ACTIONS } from '../products.actions';
import { allProducts, isProductsLoading } from '../products.selectors';
import { CreateproductmodalComponent } from '../createproductmodal/createproductmodal.component';

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
  ],
})
export class HomeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  newProducts$!: Observable<ProductData[]>;

  products!: Signal<ProductData[]>;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  loading!: Signal<boolean>;
  productLength: number = 0;
  durationInSeconds = 2;
  toggleModal: boolean = false;

  @ViewChild('cardRef', { read: ElementRef })
  card!: ElementRef;

  @ViewChild('container')
  container!: ElementRef;

  constructor(
    private router: Router,
    private productService: ProductService,
    private searchService: SearchService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PRODUCT_ACTIONS.loadProduct());
    this.products = this.store.selectSignal(allProducts);
    this.loading = this.store.selectSignal(isProductsLoading);
  }

  onToggleCreatProductModal() {
    this.toggleModal = !this.toggleModal;
  }
  onInputChange(event: KeyboardEvent) {
    const text = (event.target as HTMLInputElement).value;
    this.searchService.getSearchData(text);
  }

  onProductSelectedToCart(product: cartProductData): void {
    this.productService.setSelectedProductToCart(product);
    this.openSnackBar('Item added to cart', 'Close');
  }

  onProductSelectDetail(product: cartProductData): void {
    this.router.navigate(['/details', product.id]);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
