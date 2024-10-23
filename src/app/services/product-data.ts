
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

  export interface  CartProductData extends ProductData {
    count?:  number;
  }


