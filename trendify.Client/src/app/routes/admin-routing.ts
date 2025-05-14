import { Routes } from "@angular/router";
import { HomeComponent } from "../components/admin/home/home.component";
import { LayoutComponent } from "../components/admin/layout/layout.component";
import { ProductsComponent } from "../components/admin/products/products.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent
      }
    ],
  },
];
