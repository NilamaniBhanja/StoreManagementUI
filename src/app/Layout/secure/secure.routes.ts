import { DashboardComponent } from './../../Dashboard/dashboard.component';
import { Routes} from '@angular/router';
export const SECURE_ROUTES: Routes = [
    { path: 'Dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full', },
  { path: '**', component: DashboardComponent }
];