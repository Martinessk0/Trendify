import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { OrderDetailsModel } from '../models/order/orderDetails-model';
import { OrderSummaryModel } from '../models/order/orderSummary-model';
import { UpdateOrderStatusModel } from '../models/order/updateOrderStatus-model';
import { CreateOrderModel } from '../models/order/createOrder-model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderSummaryModel[]> {
    return this.http.get<OrderSummaryModel[]>(this.api);
  }

  getOrder(id: number): Observable<OrderDetailsModel> {
    return this.http.get<OrderDetailsModel>(`${this.api}/${id}`);
  }

  createOrder(dto: CreateOrderModel): Observable<OrderDetailsModel> {
    return this.http.post<OrderDetailsModel>(this.api, dto);
  }

  updateStatus(id: number, dto: UpdateOrderStatusModel): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/status`, dto);
  }

  cancelOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
