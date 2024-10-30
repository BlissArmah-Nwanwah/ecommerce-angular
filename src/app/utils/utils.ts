// src/app/test-utils.ts

import {CartProductData, ProductData} from '../services/product-data';

export const cartProduct: CartProductData = {
  id: '1',
  title: 'Product 1',
  price: '100',
  description: 'Description 1',
  category: 'Category 1',
  count: 1,
  image: '',
  rating: {
    rate: 2,
    count: 4,
  },
};

export const mockProducts: ProductData[] = [
  {
    id: '1',
    title: 'Product 1',
    price: '100',
    description: 'Description 1',
    category: 'Category 1',
    image: '',
    rating: {
      rate: 2,
      count: 4,
    },
  },
  {
    id: '2',
    title: 'Product 2',
    price: '200',
    description: 'Description 2',
    category: 'Category 2',
    image: '',
    rating: {
      rate: 2,
      count: 4,
    },
  },
];
