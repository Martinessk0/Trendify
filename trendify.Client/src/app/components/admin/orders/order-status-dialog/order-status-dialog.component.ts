import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface OrderStatusDialogData {
  orderId: number;
  currentStatusId: number;
  statuses: { id: number; name: string }[];
}

@Component({
  selector: 'app-order-status-dialog',
  imports: [
     MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './order-status-dialog.component.html',
  styleUrl: './order-status-dialog.component.scss'
})
export class OrderStatusDialogComponent {
  selectedStatus: number;

  constructor(
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderStatusDialogData
  ) {
    this.selectedStatus = data.currentStatusId;
  }

  save() {
    this.dialogRef.close(this.selectedStatus);
  }

  cancel() {
    this.dialogRef.close();
  }
}