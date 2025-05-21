import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/public/layout/layout.component';
import { HomeComponent } from '../components/public/home/home.component';
import { ProfileComponent } from '../components/public/account/profile/profile.component';
import { LoginComponent } from '../components/public/account/login/login.component';
import { authGuard } from '../guards/auth.guard';
import { ProductDetailsComponent } from '../components/shared/product-details/product-details.component';
import { ShopComponent } from '../components/public/shop/shop.component';
import { RegisterComponent } from '../components/public/account/register/register.component';
import { CartComponent } from '../components/public/cart/cart.component';
import { CheckoutComponent } from '../components/public/checkout/checkout.component';
import { OrdersComponent } from '../components/public/orders/orders.component';
import { loginGuard } from '../guards/login-guard';
import { OrderDetailComponent } from '../components/public/order-detail/order-detail.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
      {
        path: 'home-page',
        component: HomeComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [loginGuard], 
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [loginGuard], 
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [loginGuard], 
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,  
        canActivate: [loginGuard], 
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent ,  
        canActivate: [loginGuard], 
      },
      {
        path: 'product/details/:id',
        component: ProductDetailsComponent,
      },
    ],
  },
];
