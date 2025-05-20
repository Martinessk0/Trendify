import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormActions } from '../../../../enums/form-actions.enum';
import { ProductModel } from '../../../../models/product-model';
import { ProductFormDialogComponent, ProductDialogData } from '../../products/product-form-dialog/product-form-dialog.component';
import { CategoryModel } from '../../../../models/category-model';

export interface CategoryDialogData {
  title: string;
  model: CategoryModel;
  action: FormActions;
}

@Component({
  selector: 'app-category-form-dialog',
  imports: [MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './category-form-dialog.component.html',
  styleUrl: './category-form-dialog.component.scss'
})
export class CategoryFormDialogComponent {
  form: FormGroup;
  action = FormActions;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
  ) {
    this.form = this.fb.group({
      name: [{ value: data.model.name, disabled: data.action === FormActions.VIEW }, Validators.required],
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
