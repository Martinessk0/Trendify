import { DeliveryAddressModel } from "./deliveryAddress-model";
import { OrderItemModel } from "./orderItem-model";

export class OrderDetailsModel {
    id!: number;
    orderNumber!: string;
    orderDate!: string;
    fullName!: string;
    email!: string;
    phoneNumber!: string;
    status!: string;
    deliveryAddress!: DeliveryAddressModel;
    items: OrderItemModel[] = [];
    total!: number;

    constructor(init?: Partial<OrderDetailsModel>) {
        if (init) {
            Object.assign(this, init);

            if (init.deliveryAddress) {
                this.deliveryAddress = new DeliveryAddressModel(init.deliveryAddress);
            }
            if (init.deliveryAddress) {
                this.deliveryAddress = new DeliveryAddressModel(init.deliveryAddress);
            }
            if (Array.isArray(init.items)) {
                this.items = init.items.map(i => new OrderItemModel(i));
            }
        }
    }
}
