import {ProductService} from '../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PRODUCT_ACTIONS} from './products.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {SnackbarService} from "../services/snackbar.service";
import {ModalService} from "../services/modal.service";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private modalService: ModalService
  ) {
  }

  public loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadProduct),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products => PRODUCT_ACTIONS.loadProductSuccess({products})),
          catchError(error => {
            return of(PRODUCT_ACTIONS.productFailure({error}));
          })
        )
      )
    )
  );

  public createProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.createProduct),
        switchMap(({product}) =>
          this.productService.createProduct(product).pipe(
            tap(() => {
              this.modalService.closeModal();
              this.snackbarService.openSnackBar('Product created successfully', 'Close');
            })
          )
        )
      ),
    {dispatch: false}
  )
  public loadSelectedProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadSelectedProduct),
      switchMap(({productId}) =>
        this.productService.getSelectedProduct(productId).pipe(
          map(product => {
            return PRODUCT_ACTIONS.loadSelectedProductSuccess({product});
          }),
          catchError(error =>
            of(PRODUCT_ACTIONS.loadSelectedProductFailure({error}))
          )
        )
      )
    )
  );

}
