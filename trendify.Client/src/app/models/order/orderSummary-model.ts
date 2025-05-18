export class OrderSummaryModel {
    id!: number;
    orderNumber!: string;
    orderDate!: string;
    total!: number;
    status!: string;

    constructor(init?: Partial<OrderSummaryModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
