import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  public product?: ProductModel;
  private id?: string | null;
  loading = true;
  error!: string;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.error = 'No product ID provided.';
        this.loading = false;
        return;
      }

      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Could not load product.';
          this.loading = false;
        },
      });
    });
  }

  addToCart(): void {
    if (!this.product?.id) {
      Swal.fire('Error', 'Invalid product ID', 'error');
      return;
    }
  
    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: () => {
        Swal.fire({
          title: 'Added to Cart!',
          text: `${this.product!.name} was added successfully.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Failed', 'Could not add product to cart. Please try again.', 'error');
      }
    });
  }
  
  
}
