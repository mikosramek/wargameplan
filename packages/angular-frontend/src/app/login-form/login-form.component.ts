import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '~environments/environment';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  title = 'Login';
  loginForm = this.formBuilder.group({
    email: environment.enableDebug ? 'miko2@mikosramek.ca' : '',
    password: environment.enableDebug ? 'password' : '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}
  onSubmit() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.accountService
        .getAccount(email, password)
        .subscribe((account) => console.log(account));
    }
  }
}
