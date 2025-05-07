import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from '../../shared/product/product.component';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule,ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
 products: ProductModel[] = [];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res =>{
      this.products = res;
    })
  }
}
