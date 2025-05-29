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
import Swal from 'sweetalert2';
import { OrderDetailsModel } from '../../../models/order/order-details-model';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';


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
    private statusesService: OrderStatusesService,
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

  show(orderId: number) {
    // first load the full order
    this.orderService.getById(orderId).subscribe(orderDetails => {
      this.dialog.open<OrderDetailsDialogComponent, OrderDetailsModel>(
        OrderDetailsDialogComponent,
        {
          data: orderDetails,
          disableClose: true
        }
      );
    });
  }

   edit(orderId: number, currentStatusName: string) {
    this.statusesService.getAllStatuses().subscribe(statuses => {
      const currentStatus = statuses.find(s => s.name === currentStatusName);
      const currentStatusId = currentStatus ? currentStatus.id : statuses[0]?.id;

      const dialogRef = this.dialog.open<
        OrderStatusDialogComponent,
        OrderStatusDialogData,
        number
      >(OrderStatusDialogComponent, {
        width: '400px',
        data: { orderId, currentStatusId, statuses }
      });

      dialogRef.afterClosed().subscribe((newStatusId: number | undefined) => {
        if (newStatusId != null) {
          this.orderService.updateOrderStatus(orderId, { newStatusId })
            .subscribe({
              next: () => {
                const newName = statuses.find(s => s.id === newStatusId)?.name;
                this.dataSource.data = this.dataSource.data.map(o =>
                  o.id === orderId && newName
                    ? { ...o, status: newName }
                    : o
                );
                this.dataSource._updateChangeSubscription();
                Swal.fire('Updated', 'Order status has been updated.', 'success');
              },
              error: err => {
                Swal.fire('Error', err.error?.message || 'Could not update status.', 'error');
              }
            });
        }
      });
    });
  }

}