export class AccountLogin {
  userName: string;
  password: string;
}
export class AccountRegister {
  userName: string;
  eMail: string;
  phoneNumber: string;
  password: string;

}
export class ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export class UserClaim {
  claimId: string;
  userId: string;
  claimType: string;
  claimValue: string;
}

export class UserAuth {
  userName: string;
  bearerToken: string;
  isAuthenticated: boolean = false;
  claims: UserClaim[] = [];
}