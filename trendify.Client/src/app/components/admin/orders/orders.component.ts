import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrderSummaryModel } from '../../../models/order/order-summary-model';
import { OrderService } from '../../../services/order-service';
import { CommonModule, NgClass } from '@angular/common';
import { OrderStatusDialogComponent, OrderStatusDialogData } from './order-status-dialog/order-status-dialog.component';
import { OrderStatusesService } from '../../../services/order-statuses-service';


@Component({
  selector: 'app-orders',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
    NgClass
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['orderNumber', 'orderDate', 'total', 'status', 'actions'];
  dataSource = new MatTableDataSource<OrderSummaryModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.orderService.list().subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(order: OrderSummaryModel) {
    this.dialog.open<OrderStatusDialogComponent, OrderStatusDialogData>(
      OrderStatusDialogComponent,
      {
        data: { order, mode: 'view' },
        disableClose: true,
        width: '400px'
      }
    );
  }

  edit(order: OrderSummaryModel) {
    const dialogRef = this.dialog.open<
      OrderStatusDialogComponent,
      OrderStatusDialogData,
      { status: string }
    >(OrderStatusDialogComponent, {
      data: { order, mode: 'edit' },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.status && result.status !== order.status) {
        this.orderService
          .updateStatus(order.orderNumber, result.status)
          .subscribe(updatedOrder => {
            order.status = updatedOrder.status;
            this.dataSource._updateChangeSubscription();
          });
      }
    });
  }

  delete(orderNumber: string) {
    this.orderService.delete(orderNumber).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(o => o.orderNumber !== orderNumber);
      this.dataSource._updateChangeSubscription();
    });
  }
}