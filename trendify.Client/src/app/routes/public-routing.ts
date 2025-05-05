import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/public/layout/layout.component';
import { HomeComponent } from '../components/public/home/home.component';
import { ProfileComponent } from '../components/public/account/profile/profile.component';

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
        path: 'profile',
        component: ProfileComponent
        //   canActivate: [PageGuard]
      },
      // {
      //   path: 'page/pdf/:PDF_CODE',
      //   component: PdfPageComponent,
      //   canActivate: [PageGuard]
      // },
      // {
      //   path: 'page/:PAGE_CODE',
      //   component: PageComponent,
      //   canActivate: [PageGuard]
      // },
      // {
      //   path: 'page-preview/:PAGE_ID',
      //   component: PagePreviewComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'aircraft',
      //   component: AircraftComponent
      // },
      // {
      //   path: 'aircraft/:FILTER/:ICAO_CODE',
      //   component: AircraftComponent
      // },
      // {
      //   path: 'aircraft/:FILTER/:ICAO_CODE/:CODE',
      //   component: AircraftComponent
      // },
      // {
      //   path: 'no-home-page',
      //   component: NoHomePageComponent,
      //   data: { title: 'BULATSA' }
      // },
      // {
      //   path: 'error-page',
      //   component: ErrorPageComponent,
      //   data: { title: 'Error' }
      // },
      // {
      //   path: 'no-associated-profile',
      //   component: NoAssociatedProfilePageComponent,
      //   data: { title: 'BULATSA - No Associated Profile' }
      // },
      // {
      //   path: 'embededPage/:PAGE',
      //   component: EmbededPageComponent,
      //   data: { title: 'Embedded Page' }
      // },
      // {
      //   path: 'notam',
      //   component: NotamComponent,
      //   data: { title: 'Notam' }
      // },
      // {
      //   path: 'map',
      //   component: MapComponent,
      //   data: { title: 'Map' }
      // },
      // {
      //   path: 'page-not-found',
      //   component: PageNotFoundComponent,
      //   data: { title: 'Page not found!' }
      // }
    ]
  }
];
