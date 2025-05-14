export class ProductModel {
  id!: string;
  isOnSale!: boolean;
  isItNew!: boolean;
  isFeatured!: boolean;
  name!: string;
  category!: string;
  shortDescription!: string;
  description!: string;
  price!: number;
  imageUrl!: string;

  constructor(init?: Partial<ProductModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
