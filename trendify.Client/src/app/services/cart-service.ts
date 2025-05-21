import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ShoppingCartModel } from '../models/cart/shoppingCart-model';
import { AddCartItemModel } from '../models/cart/addCartItem-model';
import { UpdateCartItemModel } from '../models/cart/updateCartItem-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
   private api = `${environment.apiUrl}/cart`;
   private _count$ = new BehaviorSubject<number>(0);
   public cartCount$ = this._count$.asObservable();

  constructor(private http: HttpClient) {
    this.loadCount().subscribe();
  }

  getCart(): Observable<ShoppingCartModel> {
    return this.http.get<ShoppingCartModel>(this.api);
  }

  addItem(dto: AddCartItemModel): Observable<void> {
    return this.http.post<void>(this.api, dto).pipe(
      tap(() => this.loadCount().subscribe())
    );
  }

  updateItem(itemId: number, dto: UpdateCartItemModel): Observable<void> {
    return this.http.put<void>(`${this.api}/${itemId}`, dto).pipe(
      tap(() => this.loadCount().subscribe())
    );
  }

  removeItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${itemId}`).pipe(
      tap(() => this.loadCount().subscribe())
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.api}/clear`).pipe(
      tap(() => this._count$.next(0))
    );
  }

  // getCartCount(): Observable<number> {
  //   return this.cartCount$;
  // }

  private loadCount() {
    return this.http.get<number>(`${this.api}/itemsCount`)
      .pipe(tap(count => this._count$.next(count)));
  }
}
