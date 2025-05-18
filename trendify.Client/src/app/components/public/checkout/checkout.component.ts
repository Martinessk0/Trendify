import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart-service';
import { OrderService } from '../../../services/order-service';
import { CartItemModel } from '../../../models/cart/cartItem-model';
import { CreateOrderModel } from '../../../models/order/createOrder-model';
import { ShoppingCartModel } from '../../../models/cart/shoppingCart-model';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent  implements OnInit {
  form!: FormGroup;
  cart?: ShoppingCartModel;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phone:    ['', Validators.required],
      address:  ['', Validators.required]
    });

    this.cartService.getCart().subscribe(c => this.cart = c);
  }

  getTotal(): number {
    return this.cart?.items
      .reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0;
  }

  submit(): void {
    if (this.form.invalid || !this.cart) return;
    this.loading = true;
    const dto: CreateOrderModel = {
      email:            this.form.value.email,
      fullName:         this.form.value.fullName,
      phoneNumber:      this.form.value.phone,
      deliveryAddressId: 1,
    };

    this.orderService.createOrder(dto).subscribe({
      next: order => {
        Swal.fire('Успешно', `Поръчка #${order.orderNumber} създадена.`, 'success');
        this.router.navigate(['/orders', order.id]);
      },
      error: () => Swal.fire('Грешка', 'Не може да създам поръчката.', 'error')
    }).add(() => this.loading = false);
  }
}