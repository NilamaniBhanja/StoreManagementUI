import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePassword } from 'src/app/Model/Account.Model';
import { AccountService } from 'src/app/Security/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [
  ]
})
export class ChangePasswordComponent implements OnInit {
  user: ChangePassword = new ChangePassword();
  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
  }
  onSubmit(form : NgForm) {    
    this.user.oldPassword = form.value.oldPassword;
    this.user.newPassword = form.value.newPassword;
    this.user.confirmPassword = form.value.repeatPassword;
    console.log(this.user);
    this.accountService.changePassword(this.user)
      .subscribe(resp => { console.log(resp); },
      (err:any)=> console.log(err)
      );
  }
}
