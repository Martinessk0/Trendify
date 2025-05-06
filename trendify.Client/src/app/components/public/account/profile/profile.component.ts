import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileModel } from '../../../../models/account/profile-model';


@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user?: ProfileModel;

  constructor(public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;
    });
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
