export class OrderItemModel {
    productId!: number;
    productName!: string;
    imageUrl!: string;
    price!: number;
    quantity!: number;

    constructor(init?: Partial<OrderItemModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
