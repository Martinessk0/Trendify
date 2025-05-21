import { Component, Input } from '@angular/core';
import { CartItemModel } from '../../../../models/cart/cartItem-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail-card',
  imports: [CommonModule],
  templateUrl: './order-detail-card.component.html',
  styleUrl: './order-detail-card.component.scss'
})
export class OrderDetailCardComponent {
  @Input() item!: CartItemModel;
}
