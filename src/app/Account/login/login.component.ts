import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Security/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountLogin, UserAuth } from 'src/app/Models/Account.Model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user: AccountLogin = new AccountLogin();
  securityObject: UserAuth = null;
  returnUrl: string;
  submitted = false;

  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.user.userName = form.value.user.username;
    this.user.password = form.value.user.password; 
    console.log(this.user.userName);
    this.accountService.login(this.user)
      .subscribe(resp => {
        this.securityObject = resp;
        console.log(this.securityObject);
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
        () => {
          this.securityObject = new UserAuth();
        });
   }
}
