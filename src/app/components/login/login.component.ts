import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { LoginService } from './login.service';
import { NotFoundError } from 'src/app/common/error-handling/not-found.error';
import { BadInputError } from 'src/app/common/error-handling/bad-input.error';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutoLogin } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    //private http: LoginService,
    private http: HttpClient,
    private router: Router,
    private storage: TokenService,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12)
    ])
  });

  ngOnInit() {
    // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    // console.log(returnUrl, 'url');
    const token = this.storage.getToken();
    if (token) {
      // send http req to autologin
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getToken()
      });
      const http = new LoginService(
        'http://localhost:9090/autologin',
        this.http
      );
      http.create({}, headers).subscribe(
        (data: { message: string; success: boolean; payload: AutoLogin }) => {
          if (data.success) {
            this.router.navigate(['/']);
          }
        },
        (error: Response) => {
          console.log('Invalid Auth Token, Login now');
          // remove the token from localStorge as its not valid now
          this.storage.removeToken();
        }
      );
    }
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
  get password(): AbstractControl {
    return this.form.get('password');
  }

  emailChange(emailInput: HTMLInputElement) {
    // console.log('email change');
    // console.log(emailInput);
    // console.log(this.password);
  }

  passwordChange(passwordInput: HTMLInputElement) {
    // console.log('password change');
    // console.log(passwordInput);
    // console.log(this.password);
  }

  login() {
    if (this.form.valid) {
      console.log(this.form.value);
      const http = new LoginService('http://localhost:9090/login', this.http);
      http.create(this.form.value, null).subscribe(
        (data: { message: string; token: string }) => {
          this.storage.setToken(data.token);
          // check if the query params has returnUrl and if so, navigate to that route otherwise home
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          console.log(returnUrl);
          this.router.navigate([returnUrl || '/']);
        },
        (error: Response) => {
          if (error instanceof NotFoundError) {
            console.log('email not found');
            // email not found
            this.form.setErrors({
              emailNotFound: true
            });
          }
          if (error instanceof BadInputError) {
            console.log('wrong password');
            // wrong password
            this.form.setErrors({
              wrongPassword: true
            });
          }
          console.log(this.form);
        }
      );
    } else {
      this.form.setErrors({ dynamic: 'Wrong Credentials' });
    }
  }
}
