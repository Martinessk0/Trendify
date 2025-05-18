import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ShoppingCartModel } from '../models/cart/shoppingCart-model';
import { AddCartItemModel } from '../models/cart/addCartItem-model';
import { UpdateCartItemModel } from '../models/cart/updateCartItem-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   private api = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<ShoppingCartModel> {
    return this.http.get<ShoppingCartModel>(this.api);
  }

  addItem(dto: AddCartItemModel): Observable<void> {
    return this.http.post<void>(this.api, dto);
  }

  updateItem(itemId: number, dto: UpdateCartItemModel): Observable<void> {
    return this.http.put<void>(`${this.api}/${itemId}`, dto);
  }

  removeItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${itemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.api}/clear`);
  }
}
