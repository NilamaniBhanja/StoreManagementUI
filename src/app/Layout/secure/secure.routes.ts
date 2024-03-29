import { ProductCostComponent } from './../../Master/product-cost/product-cost.component';
import { CategoryComponent } from './../../Master/category/category.component';
import { SupplierComponent } from './../../Master/supplier/supplier.component';
import { Routes} from '@angular/router';
import { BrandComponent } from 'src/app/Master/brand/brand.component';
import { MeasurementComponent } from './../../Master/measurement/measurement.component';
import { DashboardComponent } from './../../Dashboard/dashboard.component';

export const SECURE_ROUTES: Routes = [
    { path: 'Dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
    //Master
    { path: 'Brand', component: BrandComponent, data: { title: 'Brand Master' }},
    { path: 'Supplier', component: SupplierComponent, data: { title: 'Supplier Master' }},
    { path: 'Measurement', component: MeasurementComponent, data: { title: 'Measurement Master' }},
    { path: 'Category', component: CategoryComponent, data: { title: 'Category Master' }},
    { path: 'ProductCost', component: ProductCostComponent, data: { title: 'Product Cost Master' }},
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full', },
  { path: '**', component: DashboardComponent }
];