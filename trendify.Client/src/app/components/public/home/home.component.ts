import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { CategoryModel } from '../../../models/category-model';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
    this.productService.getAllFeaturedProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
