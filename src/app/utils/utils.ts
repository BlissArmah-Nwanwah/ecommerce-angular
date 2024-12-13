import { ProductData } from '../services/product-data';
export const cartProduct = {
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

export const mockProducts = [
  {
    id: '1',
    title: 'Product 1',
    price: 100,
    description: 'Description 1',
    category: 'Category 1',
    count: 1,
  },
  {
    id: '2',
    title: 'Product 2',
    price: 200,
    description: 'Description 2',
    category: 'Category 2',
    count: 1,
  },
];

export function addProductToCart(
  cartProducts: ProductData[],
  product: ProductData
): ProductData[] {
  const existingProduct = cartProducts.find(item => item.id === product.id);

  if (existingProduct) {
    return cartProducts.map(p =>
      p.id === product.id ? { ...p, count: (p.count || 1) + 1 } : p
    );
  }

  return [...cartProducts, { ...product, count: 1 }];
}

export function incrementProductCount(
  cartProducts: ProductData[],
  productId: string
): ProductData[] {
  return cartProducts.map(product =>
    product.id === productId
      ? { ...product, count: product.count + 1 }
      : product
  );
}
export function decrementProductCount(
  cartProducts: ProductData[],
  productId: string
): ProductData[] {
  return cartProducts
    .map(product =>
      product.id === productId
        ? { ...product, count: product.count - 1 }
        : product
    )
    .filter(product => product.count > 0);
}
export function removeProductFromCart(
  cartProducts: ProductData[],
  productId: string
): ProductData[] {
  return cartProducts.filter(product => product.id !== productId);
}
