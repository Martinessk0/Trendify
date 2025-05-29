import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { UserService } from '../../../services/user-service';
import { OrderService } from '../../../services/order-service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RecentOrdersComponent } from "../recent-orders/recent-orders.component";
import { DashboardCardComponent } from "../../shared/dashboard-card/dashboard-card.component";
import { RouterLink } from '@angular/router';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule, RecentOrdersComponent, DashboardCardComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  totalProducts: number = 0;
  totalCustomers: number = 0;
  totalOrders: number = 0;
  totalRevenue: number = 0;

  isLoadingProducts = true;
  isLoadingCustomers = true;
  isLoadingOrders = true;
  isLoadingRevenue = true;

   constructor(
    private productService: ProductService,
    private userService: UserService,
    private orderService: OrderService,
  ) {
    this.productService.getTotalCount()
      .pipe(finalize(() => this.isLoadingProducts = false))
      .subscribe(count => this.totalProducts = count);

    this.userService.getTotalUserCount()
      .pipe(finalize(() => this.isLoadingCustomers = false))
      .subscribe(count => this.totalCustomers = count);

    this.orderService.getTotalCount()
      .pipe(finalize(() => this.isLoadingOrders = false))
      .subscribe(count => this.totalOrders = count);
      this.orderService.getRevenue()
      .pipe(finalize(() => this.isLoadingRevenue = false))
      .subscribe(count => this.totalRevenue = count);
  }
}
