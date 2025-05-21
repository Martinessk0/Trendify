import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateOrderModel } from '../models/order/create-order-model';
import { OrderSummaryModel } from '../models/order/order-summary-model';

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
}
