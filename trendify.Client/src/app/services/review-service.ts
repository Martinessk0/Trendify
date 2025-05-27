import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreateReviewDto } from '../models/review/create-reviews-dto';
import { ReviewModel } from '../models/review/review-model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) {}

  getByProduct(productId: number): Observable<ReviewModel[]> {
    return this.http.get<ReviewModel[]>(`${this.baseUrl}/product/${productId}`);
  }

  addReview(dto: CreateReviewDto): Observable<ReviewModel> {
    return this.http.post<ReviewModel>(this.baseUrl, dto);
  }
}
