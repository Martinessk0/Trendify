import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, delta: number): void {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }

    this.cartService.addToCart(item.product.id, delta).subscribe(() => {
      item.quantity = newQuantity;
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(
        (i) => i.product.id !== item.product.id
      );
    });
  }

  proceedToCheckout(): void {
    this.router.navigate(['checkout']);
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
  }
}
