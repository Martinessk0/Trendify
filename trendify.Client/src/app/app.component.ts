import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterPageComponent } from "./components/public/footer-page/footer-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  get isAdmin(): boolean {
    return this.router.url.includes('/admin');
  }
}
