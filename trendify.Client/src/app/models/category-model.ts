export class CategoryModel {
  id!: string;
  name!: string;

  constructor(init?: Partial<CategoryModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
