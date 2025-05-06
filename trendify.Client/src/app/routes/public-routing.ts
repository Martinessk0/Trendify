import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/public/layout/layout.component';
import { HomeComponent } from '../components/public/home/home.component';
import { ProfileComponent } from '../components/public/account/profile/profile.component';
import { LoginComponent } from '../components/public/account/login/login.component';
import { authGuard } from '../guards/auth.guard';

export const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
      },
      {
        path: 'home-page',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
      },
    ]
  }
];
