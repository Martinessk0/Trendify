import { CartItemModel } from "../cart/cartItem-model";
import { DeliveryAddressModel } from "./delivery-address-model";

export class OrderDetailsModel  {
    id!: number;
    orderNumber!: string;
    orderDate!: string;        
    total!: number;
    status!: string;
    address!: DeliveryAddressModel;
    items: CartItemModel[] = [];

    constructor(init?: Partial<OrderDetailsModel >) {
        if (init) {
            Object.assign(this, init);
            if(init.address){
                this.address = new DeliveryAddressModel(init.address);
            }
            if (Array.isArray(init.items)) {
                this.items = init.items.map(i => new CartItemModel(i));
              }
        }
    }
}
