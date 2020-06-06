import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/Account/login/login.component';
import { NotFoundErrorComponent } from 'src/app/Share/not-found-error/not-found-error.component';

export const PUBLIC_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'FileNotFound', component: NotFoundErrorComponent, data: { title: 'File Not Found' }},
    { path: 'login', component: LoginComponent }
];