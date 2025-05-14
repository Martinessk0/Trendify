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
import { ProductFormDialogComponent, ProductDialogData } from './product-form-dialog/product-form-dialog.component';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  create() {
    const dialogRef = this.dialog.open<ProductFormDialogComponent, ProductDialogData, { model: ProductModel }>(
      ProductFormDialogComponent,
      {
        width: '600px',
        data: {
          title: 'Creating New Product',
          model: new ProductModel(),
          action: FormActions.CREATE,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.model) {
        this.dataSource.data = [...this.dataSource.data, result.model];
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  show(model: ProductModel) {
    this.dialog.open(ProductFormDialogComponent, {
      width: '600px',
      data: {
        title: 'Product Details',
        model,
        action: FormActions.VIEW,
      },
      disableClose: true,
    });
  }

  edit(model: ProductModel) {
    const dialogRef = this.dialog.open<ProductFormDialogComponent, ProductDialogData, { model: ProductModel }>(
      ProductFormDialogComponent,
      {
        width: '600px',
        data: {
          title: 'Editing Product',
          model: new ProductModel(model),
          action: FormActions.EDIT,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.model) {
        this.dataSource.data = this.dataSource.data.map((p) =>
          p.id === model.id ? result.model : p
        );
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dataSource.data = this.dataSource.data.filter((p) => p.id !== id);
      this.dataSource._updateChangeSubscription();
    }
  }
}