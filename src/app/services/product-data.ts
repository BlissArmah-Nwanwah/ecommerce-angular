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
  count:number
}

export interface CreateProductData {
  title: string;
  price: string;
  description: string;
  category: string;
}



export type ActionType = 'detail' | 'addToCart'
export interface ProductActionEvent {
  type:  ActionType;
  data: ProductData;
}

