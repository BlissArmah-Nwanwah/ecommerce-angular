import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductData } from '../services/product-data';

export const PRODUCT_ACTIONS = createActionGroup({
  source: 'Product',
  events: {
    'Load Product': emptyProps(),
    'Load Product Success': props<{ products: ProductData[] }>(),
    'Product Failure': props<{ error: string }>(),
    'create Product': emptyProps(),
    'create Product success': props<{ products: ProductData[] }>(),
    'load Selected Product': props<{ productId: string }>(),
    'load selected Product success': props<{ product: ProductData }>(),
    'load selected Product failure':props<{ error: string }>(),
  },
});
