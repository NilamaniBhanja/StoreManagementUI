import { Routes} from '@angular/router';
import { BrandComponent } from 'src/app/Master/brand/brand.component';
import { MeasurementComponent } from './../../Master/measurement/measurement.component';
import { DashboardComponent } from './../../Dashboard/dashboard.component';
import { StoreComponent } from 'src/app/Master/store/store.component';

export const SECURE_ROUTES: Routes = [
    { path: 'Dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
    //Master
    { path: 'Brand', component: BrandComponent, data: { title: 'Brand Master' }},
    { path: 'Store', component: StoreComponent, data: { title: 'Store Master' }},
    { path: 'Measurement', component: MeasurementComponent, data: { title: 'Measurement Master' }},
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full', },
  { path: '**', component: DashboardComponent }
];