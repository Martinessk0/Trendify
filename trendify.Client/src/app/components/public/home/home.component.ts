import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllFeaturedProducts().subscribe(res =>{
      this.products = res;
    })
  }
}
