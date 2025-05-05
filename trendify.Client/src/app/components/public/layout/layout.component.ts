import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  imports: [NavComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [HttpClient]
})
export class LayoutComponent {

}
