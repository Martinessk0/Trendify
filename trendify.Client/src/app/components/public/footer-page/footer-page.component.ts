import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-page',
  imports: [RouterLink],
  templateUrl: './footer-page.component.html',
  styleUrl: './footer-page.component.scss'
})
export class FooterPageComponent {
  private now: Date = new Date();
  year: number = this.now.getFullYear();
}
