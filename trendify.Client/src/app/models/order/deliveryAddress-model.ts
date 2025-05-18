export class DeliveryAddressModel {
    name!: string;
    streetAddress!: string;
    city!: string;
    zipCode!: string;

    constructor(init?: Partial<DeliveryAddressModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
