import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../models/product-model';
import { CategoryModel } from '../../../models/category-model';

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
}
