import { CategoryModel } from "./category-model";

export class ProductModel {
  id!: string;
  isOnSale!: boolean;
  isItNew!: boolean;
  isFeatured!: boolean;
  name!: string;
  categoryId!: number;
  description!: string;
  price!: number;
  imageUrl!: string;

  constructor(init?: Partial<ProductModel>) {
    if (init) {
      Object.assign(this, init);
      // if (init.category) {
      //   this.category = new CategoryModel(init.category);
      // }
    }
  }
}
