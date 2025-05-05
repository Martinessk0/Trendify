import { Component, OnInit } from '@angular/core';
import { Product, ProductComponent } from "../../shared/product/product.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(`${environment.apiUrl}/Product`)
      .subscribe(products => {
        this.products = products;
      }, err => {
        console.error('Failed to load products', err);
      });
  }
}
