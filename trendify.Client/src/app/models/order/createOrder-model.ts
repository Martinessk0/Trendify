export class CreateOrderModel {
    email!: string;
    fullName!: string;
    phoneNumber!: string;
    deliveryAddressId!: number;

    constructor(init?: Partial<CreateOrderModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
