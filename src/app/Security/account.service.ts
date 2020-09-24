import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserAuth, AccountLogin, AccountRegister, ChangePassword } from '../Model/Account.Model';

const API_URL = "http://localhost:5000/api/Account/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  securityObject: UserAuth = new UserAuth();
  constructor(private http: HttpClient) { }

  login(accountLogin: AccountLogin): Observable<UserAuth> {
    console.log(accountLogin);
    this.resetSecurityObject();
    return this.http.post<UserAuth>(API_URL + "Login", accountLogin, httpOptions)
      .pipe(
        tap(resp => {
          Object.assign(this.securityObject, resp);
          localStorage.setItem("bearerToken", this.securityObject.bearerToken);
        }));
  }

  Register(accountRegister : AccountRegister) {
    return this.http.post(API_URL + "Register", accountRegister, httpOptions);
  }
  
  changePassword(changePassword : ChangePassword) {
    console.log(API_URL + "ChangePassword");
    console.log(changePassword);
    return this.http.post(API_URL + "ChangePassword", changePassword, httpOptions);
  }
  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    localStorage.removeItem("bearerToken");
  }

}
