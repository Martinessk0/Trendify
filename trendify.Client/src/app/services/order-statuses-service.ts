import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { OrderStatusesModel } from '../models/order-statuses-model';

@Injectable({ providedIn: 'root' })
export class OrderStatusesService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAllStatuses(): Observable<OrderStatusesModel[]> {
    return this.http.get<OrderStatusesModel[]>(`${this.apiUrl}/orderStatus`);
  }

  createStatus(product: OrderStatusesModel): Observable<OrderStatusesModel> {
     return this.http.post<OrderStatusesModel>(`${this.apiUrl}/orderStatus`, product);
   }

 
   deleteStatus(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/orderStatus/${id}`);
   }
}
