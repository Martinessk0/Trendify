import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category-service';
import { CategoryModel } from '../../../models/category-model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product?: ProductModel;
  loading = true;
  error = '';
  categories: CategoryModel[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private cs: CategoryService
  ) {
    // preload categories
    this.cs.getAllCategories().subscribe(res => this.categories = res);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = 'No product ID provided.';
        this.loading = false;
        return;
      }

      this.productService.getProductById(id).subscribe({
        next: res => {
          this.product = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load product.';
          this.loading = false;
        }
      });
    });
  }

  addToCart(): void {
    if (!this.product) {
      Swal.fire('Error', 'Invalid product.', 'error');
      return;
    }

    // assuming your CartService signature is addItem(productId: number, quantity?: number)
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
