import { Component, Inject } from '@angular/core';
import { OrderSummaryModel } from '../../../../models/order/order-summary-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface OrderStatusDialogData {
  order: OrderSummaryModel;
  mode: 'view' | 'edit';
}

@Component({
  selector: 'app-order-status-dialog',
  imports: [],
  templateUrl: './order-status-dialog.component.html',
  styleUrl: './order-status-dialog.component.scss'
})
export class OrderStatusDialogComponent {
  form: FormGroup;
  statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
  isView: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderStatusDialogComponent, { status: string }>,
    @Inject(MAT_DIALOG_DATA) public data: OrderStatusDialogData
  ) {
    this.isView = this.data.mode === 'view'
    this.form = this.fb.group({
      status: [{ value: data.order.status, disabled: this.isView }, Validators.required]
    });


  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({ status: this.form.value.status });
    }
  }

  close() {
    this.dialogRef.close();
  }
}