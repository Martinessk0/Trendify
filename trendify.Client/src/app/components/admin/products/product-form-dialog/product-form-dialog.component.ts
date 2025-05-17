import { Component, Inject } from '@angular/core';
import { FormActions } from '../../../../enums/form-actions.enum';
import { ProductModel } from '../../../../models/product-model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryService } from '../../../../services/category-service';
import { CategoryModel } from '../../../../models/category-model';
import { NgFor, NgIf } from '@angular/common';

export interface ProductDialogData {
  title: string;
  model: ProductModel;
  action: FormActions;
}


@Component({
  selector: 'app-product-form-dialog',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss'
})
export class ProductFormDialogComponent {
  form: FormGroup;
  action = FormActions;
  categories: CategoryModel[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: [{ value: data.model.name, disabled: data.action === FormActions.VIEW }, Validators.required],
      categoryId: [{ value: data.model.categoryId, disabled: data.action === FormActions.VIEW }],
      description: [{ value: data.model.description, disabled: data.action === FormActions.VIEW }],
      price: [{ value: data.model.price, disabled: data.action === FormActions.VIEW }, [Validators.required, Validators.min(0)]],
      imageUrl: [{ value: data.model.imageUrl, disabled: data.action === FormActions.VIEW }],
      isOnSale: [{ value: data.model.isOnSale ?? false, disabled: data.action === FormActions.VIEW }],
      isItNew: [{ value: data.model.isItNew ?? false, disabled: data.action === FormActions.VIEW }],
      isFeatured: [{ value: data.model.isFeatured ?? false, disabled: data.action === FormActions.VIEW }],
    });
    console.log('data: ',this.data);

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Failed to load categories:', err),
    });
  }

  get isViewMode(): boolean {
    return this.data.action === FormActions.VIEW;
  }


  save() {
    console.log('form: ',this.form);
    if (this.form.valid) {
      this.dialogRef.close({ model: new ProductModel(this.form.value) });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}