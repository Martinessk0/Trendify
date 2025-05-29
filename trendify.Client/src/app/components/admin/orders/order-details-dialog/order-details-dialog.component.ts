import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsModel } from '../../../../models/order/order-details-model';
import { CurrencyPipe, DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-details-dialog',
  imports: [MatDialogModule,CurrencyPipe,DatePipe,NgFor,NgClass],
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.scss'
})
export class OrderDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailsModel
  ) {}

  close() {
    this.dialogRef.close();
  }
}
