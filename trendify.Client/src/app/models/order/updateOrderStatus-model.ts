export class UpdateOrderStatusModel {
    newStatusId!: number;

    constructor(init?: Partial<UpdateOrderStatusModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
