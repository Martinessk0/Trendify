export class ReviewModel {
    id!: number;
    comment!: string;
    displayName!: string;
    createdAt!: string;

    constructor(init?: Partial<ReviewModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}


