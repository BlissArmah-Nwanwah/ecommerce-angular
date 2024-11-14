import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {CreateProductData, ProductData} from '../services/product-data';

export const PRODUCT_ACTIONS = createActionGroup({
  source: 'Product',
  events: {
    'Load Product': emptyProps(),
    'Load Product Success': props<{ products: ProductData[] }>(),
    'Product Failure': props<{ error: string }>(),
    'Create Product': props<{ products: CreateProductData }>(),
    'Create Product Success': props<{ products: ProductData[] }>(),
    'Load Selected Product': props<{ productId: string }>(),
    'Load Selected Product Success': props<{ product: ProductData }>(),
    'Load Selected Product Failure': props<{ error: string }>(),
    'Add Product To Cart': props<{ product: ProductData }>(),
    'Increment Product Count': props<{ productId: string }>(),
    'Decrement Product Count': props<{ productId: string }>(),
    'Remove Product From Cart': props<{ productId: string }>(),
  },
});
