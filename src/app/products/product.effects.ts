import { ProductService } from './../services/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PRODUCT_ACTIONS } from './products.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store
  ) {}

  public loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadProduct),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products => PRODUCT_ACTIONS.loadProductSuccess({ products })),
          catchError(error => {
            return of(PRODUCT_ACTIONS.productFailure({ error }));
          })
        )
      )
    )
  );

  public createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.createProduct),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products => PRODUCT_ACTIONS.loadProductSuccess({ products })),
          catchError(error => of(PRODUCT_ACTIONS.productFailure({ error })))
        )
      )
    )
  );

  public loadSelectedProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PRODUCT_ACTIONS.loadSelectedProduct),
      switchMap(({ productId }) =>
        this.productService.getSelectedProduct(productId).pipe(
          map(product => {
            return PRODUCT_ACTIONS.loadSelectedProductSuccess({ product });
          }),
          catchError(error =>
            of(PRODUCT_ACTIONS.loadSelectedProductFailure({ error }))
          )
        )
      )
    )
  );

  public addProductToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PRODUCT_ACTIONS.addProductToCart),
        tap(({ product }) => {
          this.productService.addProductToCart(product);
        })
      ),
    { dispatch: false }
  );
}
