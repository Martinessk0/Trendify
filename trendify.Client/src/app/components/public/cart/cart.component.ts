import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { ShoppingCartModel } from '../../../models/cart/shoppingCart-model';
import { CartItemModel } from '../../../models/cart/cartItem-model';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from "./cart-item/cart-item.component";



@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart?: ShoppingCartModel;
  loading = true;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.loading = false;
      this.totalPrice = 0;
      cart.items.forEach(el => {
        this.totalPrice += el.price * el.quantity;
      });
    });
  }

  changeQty(item: CartItemModel, qty: number) {
    if (qty < 1) return;
    this.cartService.updateItem(item.id, { quantity: qty })
      .subscribe(() => this.loadCart());
  }

  remove(item: CartItemModel) {
    this.cartService.removeItem(item.id)
      .subscribe(() => this.loadCart());
  }

  clear() {
    this.cartService.clearCart()
      .subscribe(() => this.loadCart());
  }
}
