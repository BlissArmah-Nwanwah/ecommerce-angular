import { createReducer, on } from '@ngrx/store';
import { PRODUCT_ACTIONS } from './products.actions';
import { ProductData } from '../services/product-data';

export interface ProductState {
    products: ProductData[];
    selectedProduct: ProductData | null;
    isLoading: boolean;
    error: string | null;
  }

export const initialState:ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(PRODUCT_ACTIONS.createProduct, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadProduct, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadProductSuccess,(state,{products})=>({
    ...state,
    products,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.productFailure,(state,{error})=>({
    ...state,
    error,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProduct,(state)=>({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductSuccess,(state,{product})=>({
    ...state,
    selectedProduct: product,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductFailure,(state,{error})=>({
    ...state,
    error,
    isLoading: false,
  })),
);
