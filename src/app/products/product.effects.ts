import {ProductService} from '../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PRODUCT_ACTIONS} from './products.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {SnackbarService} from "../services/snackbar.service";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackbarService: SnackbarService,
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
      switchMap(({products}) =>
        this.productService.createProduct(products).pipe(
          map(products => {
            this.snackbarService.openSnackBar('Product created successfully', 'Close');
            return PRODUCT_ACTIONS.loadProductSuccess({products});
          }),
          catchError(error => of(PRODUCT_ACTIONS.productFailure({error})))
        )
      )
    )
  );

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

  public addProductToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.addProductToCart),
        tap(({product}) => PRODUCT_ACTIONS.addProductToCart({product})
        )
      ),
    {dispatch: false}
  );
  public incrementProductCount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.incrementProductCount),
        tap(({productId}) => PRODUCT_ACTIONS.incrementProductCount({productId})
        )
      ),
    {dispatch: false}
  );
  public decrementProductCount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.decrementProductCount),
        tap(({productId}) => PRODUCT_ACTIONS.decrementProductCount({productId})
        )
      ),
    {dispatch: false}
  );
  public removeProductFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.removeProductFromCart),
        tap(({productId}) => PRODUCT_ACTIONS.removeProductFromCart({productId})
        )
      ),
    {dispatch: false}
  );
}
