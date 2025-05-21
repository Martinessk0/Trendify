import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order-service';
import { CommonModule } from '@angular/common';
import { OrderSummaryModel } from '../../../models/order/order-summary-model';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: OrderSummaryModel[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;
    this.error = '';

    this.orderService.list().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Неуспешно зареждане на поръчките.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}