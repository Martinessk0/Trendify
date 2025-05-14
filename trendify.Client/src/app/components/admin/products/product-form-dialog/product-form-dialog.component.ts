import { Component, Inject } from '@angular/core';
import { FormActions } from '../../../../enums/form-actions.enum';
import { ProductModel } from '../../../../models/product-model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatButtonModule],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.scss'
})
export class ProductFormDialogComponent {
  form: FormGroup;
  action = FormActions;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.form = this.fb.group({
      id: [data.model.id, Validators.required],
      name: [data.model.name, Validators.required],
      category: [data.model.category],
      shortDescription: [data.model.shortDescription],
      description: [data.model.description],
      price: [data.model.price, [Validators.required, Validators.min(0)]],
      imageUrl: [data.model.imageUrl],
      isOnSale: [data.model.isOnSale],
      isItNew: [data.model.isItNew],
      isFeatured: [data.model.isFeatured],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({ model: new ProductModel(this.form.value) });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}