import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    UnauthorizedErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
