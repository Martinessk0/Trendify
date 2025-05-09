import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  apiUrl: string = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  placeOrder(customerName: string, customerAddress: string) {
    return this.http.post<{ orderId: string }>(this.apiUrl, {
      customerName,
      customerAddress,
    });
  }

  getUserOrders() {
    return this.http.get<any[]>('api/order');
  }
}
