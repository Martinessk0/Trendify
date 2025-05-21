export class DeliveryAddressModel {
    streetAddress!: string;
    zipCode!: string;
    city!: string;
    name?: string;

    constructor(init?: Partial<DeliveryAddressModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
