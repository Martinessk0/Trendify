import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private authService: AuthService,
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
