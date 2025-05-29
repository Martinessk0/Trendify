import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateOrderModel } from '../models/order/create-order-model';
import { OrderSummaryModel } from '../models/order/order-summary-model';
import { OrderDetailsModel } from '../models/order/order-details-model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) { }

  create(dto: CreateOrderModel): Observable<number> {
    return this.http.post<number>(this.api, dto);
  }

  list(): Observable<OrderSummaryModel[]> {
    return this.http.get<OrderSummaryModel[]>(this.api);
  }

  getById(id: number): Observable<OrderDetailsModel> {
    return this.http.get<OrderDetailsModel>(`${this.api}/${id}`);
  }

  getRecent(count: number): Observable<OrderSummaryModel[]> {
    return this.http.get<OrderSummaryModel[]>(`${this.api}/recent?count=${count}`);
  }

  getRevenue() {
    return this.http.get<number>(`${this.api}/revenue`)
  }

  getTotalCount() {
    return this.http.get<number>(`${this.api}/totalCount`)
  }

  // updateOrderStatus(id: number) {
  //   return this.http.get<number>(`${this.api}/${id}/status`)
  // }

  updateOrderStatus(id: number, dto: { newStatusId: number }) {
  return this.http.patch<void>(`${this.api}/${id}/status`, dto);
}
}
