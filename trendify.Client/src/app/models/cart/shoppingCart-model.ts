import { CartItemModel } from "./cartItem-model";

export class ShoppingCartModel {
  buyerId!: string;
  items: CartItemModel[] = [];

  constructor(init?: Partial<ShoppingCartModel>) {
    if (init) {
      // copy any simple props
      Object.assign(this, init);

      // now rebuild `items` from the raw array JSON
      if (Array.isArray(init.items)) {
        this.items = init.items.map(i => new CartItemModel(i));
      }
    }
  }
}
