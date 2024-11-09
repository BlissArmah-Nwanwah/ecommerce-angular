export interface ProductData {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Create this interface either in the same file or in a separate file if needed
export interface ProductActionEvent {
  type: 'detail' | 'addToCart';
  data: ProductData;
}

export interface CartProductData extends ProductData {
  count?: number;
}
