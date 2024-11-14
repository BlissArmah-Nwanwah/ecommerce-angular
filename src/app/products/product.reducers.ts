import {createReducer, on} from '@ngrx/store';
import {PRODUCT_ACTIONS} from './products.actions';
import {ProductData} from '../services/product-data';

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
  on(PRODUCT_ACTIONS.loadProductSuccess, (state, {products}) => ({
    ...state,
    products,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.productFailure, (state, {error}) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProduct, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductSuccess, (state, {product}) => ({
    ...state,
    selectedProduct: product,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.loadSelectedProductFailure, (state, {error}) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(PRODUCT_ACTIONS.addProductToCart, (state, {product}) => {
    const existingProduct = state.cartProducts.find(item => item.id === product.id);
    const updatedCart = existingProduct
      ? state.cartProducts.map(p =>
        p.id === product.id ? {...p, count: (p.count || 1) + 1} : p
      )
      : [...state.cartProducts, {...product, count: 1}];

    return {
      ...state,
      cartProducts: updatedCart,
    };
  }),
  on(PRODUCT_ACTIONS.incrementProductCount, (state, {productId}) => {
    const updatedCart = state.cartProducts.map(product =>
      product.id === productId ? {...product, count: (product.count) + 1} : product
    );
    return {...state, cartProducts: updatedCart};
  }),
  on(PRODUCT_ACTIONS.decrementProductCount, (state, {productId}) => {
    const updatedCart = state.cartProducts
      .map(product =>
        product.id === productId && product?.count > 1
          ? {...product, count: product?.count - 1}
          : product
      )
      .filter(product => product?.count > 0);

    return {...state, cartProducts: updatedCart};
  }),
  on(PRODUCT_ACTIONS.removeProductFromCart, (state, {productId}) => ({
    ...state,
    cartProducts: state.cartProducts.filter(product => product.id !== productId),
  }))
);
