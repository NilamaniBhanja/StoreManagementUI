import { UnauthorizedErrorComponent } from './Share/unauthorized-error/unauthorized-error.component';
import { ServerErrorComponent } from './Share/server-error/server-error.component';
import { NotFoundErrorComponent } from './Share/not-found-error/not-found-error.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Account/change-password/change-password.component';
import { RegisterComponent } from './Account/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';


const routes: Routes = [  

  // Account
  { path: 'Login', component: LoginComponent, data: { title: 'User Login' }},
  { path: 'Register', component: RegisterComponent, data: { title: 'User Register' }},
  { path: 'ChangePassword', component: ChangePasswordComponent, data: { title: 'Change Password' }},
  { path: 'ForgotPassword', component: ForgotPasswordComponent, data: { title: 'Forgot Password' }},
  

  //Error
  { path: 'FileNotFound', component: NotFoundErrorComponent, data: { title: 'File Not Found' }},
  { path: 'InternalServerError', component: ServerErrorComponent, data: { title: 'Internal Server Error' }},
  { path: 'UnauthorizedError', component: UnauthorizedErrorComponent, data: { title: 'Unauthorized Error' }},
  { path: '', redirectTo: 'Login', pathMatch: 'full', },
  { path: '**', component: LoginComponent }
  //{ path: '**', component: NotFoundErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
