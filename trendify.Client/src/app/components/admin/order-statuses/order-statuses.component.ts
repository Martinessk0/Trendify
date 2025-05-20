import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderStatusesService } from '../../../services/order-statuses-service';
import { OrderStatusesModel } from '../../../models/order-statuses-model';
import Swal from 'sweetalert2';
import { FormActions } from '../../../enums/form-actions.enum';
import { OrderStatusDialogData, StatusFormDialogComponent } from './status-form-dialog/status-form-dialog.component';

@Component({
  selector: 'app-order-statuses',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './order-statuses.component.html',
  styleUrl: './order-statuses.component.scss'
})
export class OrderStatusesComponent  implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<OrderStatusesModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderStatusesService: OrderStatusesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.orderStatusesService.getAllStatuses().subscribe((statuses) => {
      this.dataSource.data = statuses;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   create() {
       const dialogRef = this.dialog.open<StatusFormDialogComponent, OrderStatusDialogData, { model: OrderStatusesModel }>(
        StatusFormDialogComponent,
         {
           width: '400px',
           data: {
             title: 'Creating New status',
             model: new OrderStatusesModel(),
             action: FormActions.CREATE,
           },
         }
       );
   
       dialogRef.afterClosed().subscribe((result) => {
         if (result?.model) {
           this.orderStatusesService.createStatus(result.model).subscribe({
             next: (created) => {
               this.dataSource.data = [...this.dataSource.data, created];
               this.dataSource._updateChangeSubscription();
   
               Swal.fire({
                 icon: 'success',
                 title: 'Success',
                 text: 'Status created successfully!',
                 confirmButtonColor: '#3085d6',
               });
             },
             error: (err) => {
               Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: err?.error?.message || 'Failed to create status.',
                 confirmButtonColor: '#d33',
               });
             },
           });
         }
       });
     }
   
   
   
     show(model: OrderStatusesModel) {
       this.dialog.open(StatusFormDialogComponent, {
         width: '600px',
         data: {
           title: 'Status Details',
           model,
           action: FormActions.VIEW,
         },
         disableClose: true,
       });
     }
   
     edit(model: OrderStatusesModel) {
       const dialogRef = this.dialog.open<StatusFormDialogComponent, OrderStatusDialogData, { model: OrderStatusesModel }>(
         StatusFormDialogComponent,
         {
           width: '600px',
           data: {
             title: 'Editing status',
             model: new OrderStatusesModel(model),
             action: FormActions.EDIT,
           },
         }
       );
   
       dialogRef.afterClosed().subscribe((result) => {
         if (result?.model) {
           console.log("result: ",result.model);
           this.orderStatusesService.updateStatus(+model.id, result.model).subscribe({
             next: (updated) => {
               this.dataSource.data = this.dataSource.data.map((p) =>
                 p.id === updated.id ? updated : p
               );
               this.dataSource._updateChangeSubscription();
   
               Swal.fire({
                 icon: 'success',
                 title: 'Success',
                 text: 'Status updated successfully!',
                 confirmButtonColor: '#3085d6',
               });
             },
             error: (err) => {
               Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: err?.error?.message || 'Failed to update status.',
                 confirmButtonColor: '#d33',
               });
             },
           });
         }
       });
     }
   
   
   delete(id: number) {
     Swal.fire({
       title: 'Are you sure?',
       text: 'This status will be hidden from the shop.',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'Cancel',
     }).then((result) => {
       if (result.isConfirmed) {
         this.orderStatusesService.deleteStatus(id).subscribe({
           next: () => {
             this.dataSource.data = this.dataSource.data.filter((p) => +p.id !== id);
             this.dataSource._updateChangeSubscription();
   
             Swal.fire({
               icon: 'success',
               title: 'Deleted',
               text: 'Status was deleted successfully!',
               confirmButtonColor: '#3085d6',
             });
           },
           error: (err) => {
             Swal.fire({
               icon: 'error',
               title: 'Error',
               text: err?.error?.message || 'Failed to delete product.',
               confirmButtonColor: '#d33',
             });
           },
         });
       }
     });
   }
  
}
