export interface ProductModel {
    id: number;
    isOnSale: boolean;
    isItNew: boolean;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    price: number;
    imageUrl: string;
  }