export class CreateReviewDto {
    productId!: number;
    comment!: string;
    reviewerName?: string;

    constructor(init?: Partial<CreateReviewDto>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}


