import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, AsyncPipe,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  cartCount$!: Observable<number>;
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount$;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
