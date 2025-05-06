import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}



@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user?: UserProfile;

  constructor(public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserDetail();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
