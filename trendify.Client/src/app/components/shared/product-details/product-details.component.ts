import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute
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

  addToCart(){
    
  }
}
