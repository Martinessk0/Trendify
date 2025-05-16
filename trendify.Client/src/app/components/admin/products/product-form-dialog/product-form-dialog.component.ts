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
import { NgFor } from '@angular/common';

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
    NgFor
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
      name: [data.model.name, Validators.required],
      category: [data.model.category],
      description: [data.model.description],
      price: [data.model.price, [Validators.required, Validators.min(0)]],
      imageUrl: [data.model.imageUrl],
      isOnSale: [data.model.isOnSale ?? false],
      isItNew: [data.model.isItNew ?? false],
      isFeatured: [data.model.isFeatured ?? false],
    });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Failed to load categories:', err),
    });
  }

  save() {
    console.log('Save clicked, form valid:', this.form);
    if (this.form.valid) {
      this.dialogRef.close({ model: new ProductModel(this.form.value) });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}