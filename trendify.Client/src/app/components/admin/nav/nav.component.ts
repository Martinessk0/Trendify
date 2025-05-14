import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(public authService: AuthService,
    public router: Router
  ) { }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
