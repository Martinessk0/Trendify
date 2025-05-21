import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OrderSummaryModel } from '../../../models/order/order-summary-model';
import { OrderService } from '../../../services/order-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recent-orders',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss'
})
export class RecentOrdersComponent  implements AfterViewInit, OnInit {
  // … existing fields …

  recentOrders: OrderSummaryModel[] = [];
  isLoadingRecent = true;

  constructor(
    private orderService: OrderService,
    // … other services …
  ) { /* existing init */ }

  ngOnInit(): void {
    this.fetchRecentOrders();
  }

  fetchRecentOrders() {
    this.isLoadingRecent = true;
    this.orderService.getRecent(10)
      .pipe(finalize(() => this.isLoadingRecent = false))
      .subscribe({
        next: data => this.recentOrders = data,
        error: err => console.error('Failed to load recent orders', err)
      });
  }

  ngAfterViewInit() {
    // … paginator init if still using the dummy table …
  }
}