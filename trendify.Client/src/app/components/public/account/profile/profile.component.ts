import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string | null;
  twoFactorEnabled: boolean;
  phoneNumberConfirmed: boolean;
  accessFailedCount: number;
}


@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: UserProfile;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<UserProfile>(`${environment.apiUrl}/Account/deteil`)
      .subscribe(account => {
        this.user = account;
      }, err => {
        console.error('Failed to load products', err);
      });
  }
}
