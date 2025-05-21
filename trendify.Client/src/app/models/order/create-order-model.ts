import { DeliveryAddressModel } from "./delivery-address-model";

export class CreateOrderModel {
    email!: string;
    fullName!: string;
    phoneNumber!: string;
    address!: DeliveryAddressModel;

    constructor(init?: Partial<CreateOrderModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}


