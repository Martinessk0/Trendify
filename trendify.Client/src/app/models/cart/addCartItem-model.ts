export class AddCartItemModel {
  productId!: number;
  quantity!: number;

  constructor(init?: Partial<AddCartItemModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
