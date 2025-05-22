import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterPageComponent } from "./components/public/footer-page/footer-page.component";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, FooterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
