import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService, CreateOrderDto } from '../../../services/order-service';
import { CartService } from '../../../services/cart-service';
import { ShoppingCartModel } from '../../../models/cart/shoppingCart-model';
import Swal from 'sweetalert2';
import { CartItemModel } from '../../../models/cart/cartItem-model';
import { CartItemComponent } from "../cart/cart-item/cart-item.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CartItemComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  isSubmitting = false;
  cartItems: CartItemModel[] = [];
  cartTotal = 0;

  constructor(
    private fb: FormBuilder,
    private orders: OrderService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load cart from API
    this.cart.getCart().subscribe({
      next: (cart: ShoppingCartModel) => {
        this.cartItems = cart.items;
        this.cartTotal = this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
      error: () => {
        Swal.fire('Error', 'Failed to load cart.', 'error');
      }
    });

    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: this.fb.group({
        streetAddress: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        name: ['']
      })
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) return;
    this.isSubmitting = true;
    const dto = {
      ...this.checkoutForm.value,
      items: this.cartItems.map(({ productId, quantity }) => ({ productId, quantity }))
    } as CreateOrderDto;

    this.orders.create(dto).subscribe({
      next: orderId => {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: `Your order #${orderId} was successful.`,
          confirmButtonText: 'Back to Cart'
        }).then(result => {
          if (result.isConfirmed) {
            this.cart.clearCart().subscribe(() => {
              this.router.navigate(['/cart']);
            });
          }
        });
      },
      error: () => {
        this.isSubmitting = false;
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
      }
    });
  }
}