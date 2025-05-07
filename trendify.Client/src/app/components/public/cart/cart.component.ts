import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [
    { id: 1, name: 'Lemonade', price: 5.80, quantity: 2, imageUrl: 'https://herbsandflour.com/wp-content/uploads/2020/05/Homemade-Lemonade-Recipe.jpg' },
    { id: 2, name: 'Iced tea', price: 2.10, quantity: 1, imageUrl: 'https://bgonlineshop.com/Images/Items/Big/927.jpg' }
  ];

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updateQuantity(item: CartItem, delta: number): void {
    item.quantity += delta;
    if (item.quantity < 1) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  proceedToCheckout(): void {
    // Logic for checkout
    alert('Proceeding to checkout...');
  }
}
