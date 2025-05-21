import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../models/product-model';
import { CategoryModel } from '../../../models/category-model';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [HttpClient],
})
export class ProductCardComponent {
  @Input() product!: ProductModel;
  @Input() categories: CategoryModel[] = [];

  constructor(private cartService: CartService){

  }

   addToCart(): void {
    if (!this.product) {
      Swal.fire('Error', 'Invalid product.', 'error');
      return;
    }

    this.cartService.addItem({productId: +this.product.id,quantity: 1}).subscribe({
      next: () => {
        Swal.fire({
          title: 'Added to Cart!',
          text: `${this.product!.name} was added successfully.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: () => {
        Swal.fire('Failed', 'Could not add product to cart. Please try again.', 'error');
      }
    });
  }
}
