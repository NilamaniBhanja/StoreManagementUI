import { DashboardComponent } from './../../Dashboard/dashboard.component';
import { Routes} from '@angular/router';
import { BrandComponent } from 'src/app/Master/brand/brand.component';
export const SECURE_ROUTES: Routes = [
    { path: 'Dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
    //Master
    { path: 'Brand', component: BrandComponent, data: { title: 'Brand Master' }},
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full', },
  { path: '**', component: DashboardComponent }
];