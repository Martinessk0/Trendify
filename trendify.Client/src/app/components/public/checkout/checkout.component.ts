import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart-service';
import { OrderService } from '../../../services/order-service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  form: FormGroup;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }

  submit(): void {
    if (this.form.invalid || this.cartItems.length === 0) {
      Swal.fire('Error', 'Please complete all fields and make sure your cart is not empty.', 'warning');
      return;
    }

    const { name, address } = this.form.value;

    this.orderService.placeOrder(name!, address!).subscribe({
      next: res => {
        Swal.fire('Success', 'Order placed successfully!', 'success');
        this.cartService.clearCart(); // ако имаш такава логика
        this.router.navigate(['/']); // или към /orders
      },
      error: () => {
        Swal.fire('Error', 'Failed to place the order. Try again.', 'error');
      }
    });
  }
}
