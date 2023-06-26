import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  iniciarSession: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private user: UserService) {
    this.iniciarSession = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  sendData() {
    if (
      this.iniciarSession.value.email ||
      this.iniciarSession.value.password == ''
    )
      return window.alert('Ingrese credenciales');

    this.user
      .SignIn(
        this.iniciarSession.value.email,
        this.iniciarSession.value.password
      )
      .catch((error) => {
        if (
          error.message ==
          'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'
        ) {
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 5000);
        }
      });
  }
}
