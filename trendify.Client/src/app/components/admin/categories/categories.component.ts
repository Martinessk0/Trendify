import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryModel } from '../../../models/category-model';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';
import { FormActions } from '../../../enums/form-actions.enum';
import { CategoryDialogData, CategoryFormDialogComponent } from './category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-categories',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<CategoryModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.dataSource.data = categories;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   create() {
      const dialogRef = this.dialog.open<CategoryFormDialogComponent, CategoryDialogData, { model: CategoryModel }>(
        CategoryFormDialogComponent,
        {
          width: '600px',
          data: {
            title: 'Creating New Category',
            model: new CategoryModel(),
            action: FormActions.CREATE,
          },
        }
      );
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.model) {
          this.categoryService.createCategory(result.model).subscribe({
            next: (created) => {
              this.dataSource.data = [...this.dataSource.data, created];
              this.dataSource._updateChangeSubscription();
  
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category created successfully!',
                confirmButtonColor: '#3085d6',
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.error?.message || 'Failed to create category.',
                confirmButtonColor: '#d33',
              });
            },
          });
        }
      });
    }
  
  
  
    show(model: CategoryModel) {
      this.dialog.open(CategoryFormDialogComponent, {
        width: '600px',
        data: {
          title: 'Category Details',
          model,
          action: FormActions.VIEW,
        },
        disableClose: true,
      });
    }
  
    edit(model: CategoryModel) {
      const dialogRef = this.dialog.open<CategoryFormDialogComponent, CategoryDialogData, { model: CategoryModel }>(
        CategoryFormDialogComponent,
        {
          width: '600px',
          data: {
            title: 'Editing Category',
            model: new CategoryModel(model),
            action: FormActions.EDIT,
          },
        }
      );
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.model) {
          console.log("result: ",result.model);
          this.categoryService.updateCategory(+model.id, result.model).subscribe({
            next: (updated) => {
              this.dataSource.data = this.dataSource.data.map((p) =>
                p.id === updated.id ? updated : p
              );
              this.dataSource._updateChangeSubscription();
  
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category updated successfully!',
                confirmButtonColor: '#3085d6',
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.error?.message || 'Failed to update category.',
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
      text: 'This category will be hidden from the shop.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter((p) => +p.id !== id);
            this.dataSource._updateChangeSubscription();
  
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Category was deleted successfully!',
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
