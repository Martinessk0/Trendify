import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { CartItem } from '../components/public/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl: string = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(productId: string, quantity: number = 1): Observable<void> {
    return this.http.post<void>(this.apiUrl, {
      productId,
      quantity
    });
  }
  

  removeFromCart(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

  clearCart(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/clear`, {});
  }
}
