import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemModel } from '../../../../models/cart/cartItem-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItemModel;
  @Input() readonly = false;

  @Output() qtyChange = new EventEmitter<number>();
  @Output('remove') private removeEvent = new EventEmitter<void>();

  changeQty(item: CartItemModel, newQty: number) {
    if (newQty < 1) {
      this.removeEvent.emit();
    } else {
      this.qtyChange.emit(newQty);
    }
  }
  remove(item: CartItemModel) {
    this.removeEvent.emit();
  }
}
