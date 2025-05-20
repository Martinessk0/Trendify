import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryModel } from '../../../models/category-model';
import { CategoryService } from '../../../services/category-service';
import { UserService } from '../../../services/user-service';
import { ProfileModel } from '../../../models/account/profile-model';

@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['fullName', 'email','roles','actions'];
  dataSource = new MatTableDataSource<ProfileModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userServices: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userServices.getAllUser().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
