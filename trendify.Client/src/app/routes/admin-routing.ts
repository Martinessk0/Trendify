import { Routes } from "@angular/router";
import { HomeComponent } from "../components/admin/home/home.component";
import { LayoutComponent } from "../components/admin/layout/layout.component";
import { ProductsComponent } from "../components/admin/products/products.component";
import { CategoriesComponent } from "../components/admin/categories/categories.component";
import { UsersComponent } from "../components/admin/users/users.component";
import { OrderStatusesComponent } from "../components/admin/order-statuses/order-statuses.component";
import { adminGuard } from "../guards/admin-guard";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [adminGuard],
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
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'order-statuses',
        component: OrderStatusesComponent,
      }
    ],
  },
];
