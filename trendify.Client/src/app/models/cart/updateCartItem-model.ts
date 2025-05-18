export class UpdateCartItemModel {
    quantity!: number;

    constructor(init?: Partial<UpdateCartItemModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
