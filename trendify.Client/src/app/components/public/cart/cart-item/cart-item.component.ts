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
  @Output() remove    = new EventEmitter<void>();

  onQtyChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    if (value > 0) this.qtyChange.emit(value);
  }

  onRemove() {
    this.remove.emit();
  }
}
