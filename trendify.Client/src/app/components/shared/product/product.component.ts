import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
}


@Component({
  selector: 'app-product',
  imports: [CommonModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [HttpClient]
})
export class ProductComponent {
  @Input() product!: Product;

}
