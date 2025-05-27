import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category-service';
import { CategoryModel } from '../../../models/category-model';
import { ReviewService } from '../../../services/review-service';
import { CreateReviewDto } from '../../../models/review/create-reviews-dto';
import { ReviewModel } from '../../../models/review/review-model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { ReviewCardComponent } from "../review-card/review-card.component";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink, FormsModule, ReviewCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product?: ProductModel;
  loading = true;
  error = '';
  categories: CategoryModel[] = [];

  reviews: ReviewModel[] = [];
  reviewDto: CreateReviewDto = {
    productId: 0,
    comment: '',
    reviewerName: ''
  };
  isLoggedIn = false;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private cs: CategoryService,
    private reviewService: ReviewService,
    private auth: AuthService
  ) {
    this.cs.getAllCategories().subscribe((res) => (this.categories = res));
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.error = 'No product ID provided.';
        this.loading = false;
        return;
      }

      this.reviewDto.productId = +id;

      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load product.';
          this.loading = false;
        },
      });

      this.loadReviews();
    });
  }

  private loadReviews(): void {
    this.reviewService
      .getByProduct(this.reviewDto.productId)
      .subscribe((r) => (this.reviews = r));
  }

  submitReview(): void {
    this.reviewService.addReview(this.reviewDto).subscribe(() => {
      this.reviewDto.comment = '';
      this.reviewDto.reviewerName = '';
      this.loadReviews();
    });
  }

  addToCart(): void {
    if (!this.product) {
      Swal.fire('Error', 'Invalid product.', 'error');
      return;
    }

    this.cartService
      .addItem({ productId: +this.product.id, quantity: 1 })
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Added to Cart!',
            text: `${this.product!.name} was added successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: () => {
          Swal.fire(
            'Failed',
            'Could not add product to cart. Please try again.',
            'error'
          );
        },
      });
  }
}
