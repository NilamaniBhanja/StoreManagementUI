import { AuthGuard } from './Security/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Account/login/login.component';
import { FooterComponent } from './Share/footer/footer.component';
import { RegisterComponent } from './Account/register/register.component';
import { ChangePasswordComponent } from './Account/change-password/change-password.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { NotFoundErrorComponent } from './Share/not-found-error/not-found-error.component';
import { ServerErrorComponent } from './Share/server-error/server-error.component';
import { UnauthorizedErrorComponent } from './Share/unauthorized-error/unauthorized-error.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './Security/http-error.interceptor';
import { TopNavComponent } from './Share/top-nav/top-nav.component';
import { SideNavComponent } from './Share/side-nav/side-nav.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { PublicComponent } from './layout/public/public.component';
import { SecureComponent } from './layout/secure/secure.component';
import { BrandComponent } from './Master/brand/brand.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    NotFoundErrorComponent,
    ServerErrorComponent,
    UnauthorizedErrorComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    PublicComponent,
    SecureComponent,
    BrandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    SweetAlert2Module
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
   },
   AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
