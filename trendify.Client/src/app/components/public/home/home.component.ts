import { Component, OnInit } from '@angular/core';
import { ProductComponent } from "../../shared/product/product.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
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
