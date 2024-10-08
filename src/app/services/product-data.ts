
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
  
  export interface  cartProductData extends ProductData {
    count?:  number;
  }
  
  
  