import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product-service';
import { ProductModel } from '../../../models/product-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormActions } from '../../../enums/form-actions.enum';

@Component({
  selector: 'app-products',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'imageUrl', 'shortDescription', 'actions'];
  dataSource = new MatTableDataSource<ProductModel>();
  private dialogConfig = new MatDialogConfig();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // As soon as products arrive, stick them into the dataSource
    this.productService.getAllProducts().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    // At this point the paginator exists; wire it up once
    this.dataSource.paginator = this.paginator;
  }
  create() {
    this.dialogConfig.data = {
      title: 'Creating new product',
      model: new ProductModel(),
      action: FormActions.CREATE,
    };

    // const dialogRef = this.dialog.open(
    //   ProductsFormComponent,
    //   this.dialogConfig
    // );
    // dialogRef.afterClosed()
    // // .pipe(takeUntil(this._unsubscribe$))
    // .subscribe(data => {
    //   if (data && data.model) {
        
    //   }
    // });
  }
  show(model: any) {}
  edit(model: any) {}
  delete(id: any) {}
}
