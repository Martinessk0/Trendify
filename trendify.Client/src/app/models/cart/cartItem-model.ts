export class CartItemModel {
  id!: number;
  productId!: number;
  productName!: string;
  imageUrl!: string;
  price!: number;
  quantity!: number;

  constructor(init?: Partial<CartItemModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
