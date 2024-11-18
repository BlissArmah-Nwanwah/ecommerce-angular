import { createReducer, on } from '@ngrx/store';
import { PRODUCT_ACTIONS } from './products.actions';
import { ProductData } from '../services/product-data';
import {addProductToCart, incrementProductCount, decrementProductCount, removeProductFromCart} from "../utils/utils";

export interface ProductState {
  products: ProductData[];
  selectedProduct: ProductData | null;
  cartProducts: ProductData[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  cartProducts: [],
  isLoading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(PRODUCT_ACTIONS.createProduct, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadProduct, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadProductSuccess, (state, { products }) => ({
    ...state,
    products,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.productFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProduct, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.addProductToCart, (state, { product }) => ({
    ...state,
    cartProducts: addProductToCart(state.cartProducts, product),
  })),
  on(PRODUCT_ACTIONS.incrementProductCount, (state, { productId }) => ({
    ...state,
    cartProducts: incrementProductCount(state.cartProducts, productId),
  })),
  on(PRODUCT_ACTIONS.decrementProductCount, (state, { productId }) => ({
    ...state,
    cartProducts: decrementProductCount(state.cartProducts, productId),
  })),
  on(PRODUCT_ACTIONS.removeProductFromCart, (state, { productId }) => ({
    ...state,
    cartProducts: removeProductFromCart(state.cartProducts, productId),
  }))
);
