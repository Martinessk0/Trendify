import { Component, Inject } from '@angular/core';
import { OrderStatusesModel } from '../../../../models/order-statuses-model';
import { FormActions } from '../../../../enums/form-actions.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface OrderStatusDialogData {
  title: string;
  model: OrderStatusesModel;
  action: FormActions;
}

@Component({
  selector: 'app-status-form-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './status-form-dialog.component.html',
  styleUrl: './status-form-dialog.component.scss',
})
export class StatusFormDialogComponent {form: FormGroup;
  action = FormActions;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StatusFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderStatusDialogData,
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
      this.dialogRef.close({ model: new OrderStatusesModel(this.form.value) });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}