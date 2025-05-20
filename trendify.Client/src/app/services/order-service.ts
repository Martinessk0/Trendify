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

}
