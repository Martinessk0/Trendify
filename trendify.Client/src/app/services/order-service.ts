import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface DeliveryAddressDto {
  streetAddress: string;
  zipCode: string;
  city: string;
  name?: string;
}

export interface CreateOrderDto {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: DeliveryAddressDto;
}

export interface OrderSummary {
  id: number;
  orderNumber: string;
  orderDate: string;
  total: number;
  status: string;
}



@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) { }

  create(dto: CreateOrderDto): Observable<number> {
    return this.http.post<number>(this.api, dto);
  }

  list(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(this.api);
  }
}
