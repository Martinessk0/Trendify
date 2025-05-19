import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { CategoryService } from '../../../services/category-service';
import { CategoryModel } from '../../../models/category-model';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private productService: ProductService,
    private cs: CategoryService
  ) {
    cs.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
