import { Component, OnInit } from '@angular/core';
import { AccountRegister } from 'src/app/Model/Account.Model';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/Security/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  user: AccountRegister = new AccountRegister();
  constructor(private accountService : AccountService){ }

  ngOnInit(): void {
  }
  onSubmit(form : NgForm) {    
    this.user.userName = form.value.username;
    this.user.password = form.value.password;
    this.user.phoneNumber = form.value.phonenumber;
    this.user.eMail = form.value.email;
    console.log(this.user);
    this.accountService.Register(this.user)
      .subscribe(resp => { console.log(resp); },
      (err:any)=> console.log(err)
      );
  }
}
