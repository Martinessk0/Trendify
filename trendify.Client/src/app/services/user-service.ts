import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/account/profile-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<ProfileModel[]> {
    return this.http.get<ProfileModel[]>(`${this.apiUrl}/account`);
  }

  getTotalUserCount() {
    return this.http.get<number>(`${this.apiUrl}/account/totalCount`)
  }

}
