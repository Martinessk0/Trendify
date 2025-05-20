export class OrderStatusesModel {
    id!: number;
    name!: string;
  
    constructor(init?: Partial<OrderStatusesModel>) {
      if (init) {
        Object.assign(this, init);
      }
    }
  }
  