import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderDetailsModel } from '../../../models/order/order-details-model';
import { OrderService } from '../../../services/order-service';
import { CommonModule } from '@angular/common';
import { OrderDetailCardComponent } from "./order-detail-card/order-detail-card.component";

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, RouterLink, OrderDetailCardComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order?: OrderDetailsModel;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getById(id).subscribe({
      next: o => {
        this.order = o;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Неуспешно зареждане на детайлите за поръчката.';
        this.loading = false;
      }
    });
  }
}