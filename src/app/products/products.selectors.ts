import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducers';

export const selectProductState =
  createFeatureSelector<ProductState>('goods');

export const isProductsLoading = createSelector(
  selectProductState,
  (goods) => goods.isLoading
);
export const allProducts = createSelector(
  selectProductState,
  (goods) => goods.products
);

export const selectedProduct = createSelector(
  selectProductState,
  (goods) => goods.selectedProduct
);
