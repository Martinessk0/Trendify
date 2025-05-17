export class CategoryModel {
  id!: number;
  name!: string;

  constructor(init?: Partial<CategoryModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
