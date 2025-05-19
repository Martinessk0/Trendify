import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../models/product-model';
import { CategoryService } from '../../../services/category-service';
import { CategoryModel } from '../../../models/category-model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [HttpClient]
})
export class ProductCardComponent {
  @Input() product!: ProductModel;
    categories: CategoryModel[] = [];

  constructor(private cs: CategoryService){
    cs.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }
}
