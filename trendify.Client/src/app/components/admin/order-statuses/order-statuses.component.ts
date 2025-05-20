import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryModel } from '../../../models/category-model';
import { CategoryService } from '../../../services/category-service';
import { OrderStatusesService } from '../../../services/order-statuses-service';
import { OrderStatusesModel } from '../../../models/order-statuses-model';

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

  create(){
    
  }
  
}
