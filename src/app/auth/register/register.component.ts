import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEX, MOBILE_REGEX } from '../../core/common/regex';
import { LoginRequest, RegisterRequest } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth/auth.service';
import { SUCCESS } from '../../core/common/pc-constants';
import { Router } from '@angular/router';
import { ROUTER_URLS } from '../../core/common/router-urls';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.getRegForm();
    this.loginForm = this.getLoginForm();
  }

  ngOnInit() {

  }

  registerForm: FormGroup;
  loginForm: FormGroup;
  signUpSuccess: boolean = false;

  showLogin: boolean = true;

  toggleDiv() {
    this.showLogin = !this.showLogin;
  }

  get signUp() {
    return this.registerForm.controls;
  }

  get signIn() {
    return this.loginForm.controls;
  }

  public getLoginForm() {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        passw: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      }
    );
  }

  public getRegForm() {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
        userFn: ['', [Validators.required]],
        userLn: ['', [Validators.required]],
        userMobile: ['', [Validators.required, Validators.pattern(MOBILE_REGEX)]],
        passw: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      }
    );
  }

  async onSignInSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    const logInRequest = this.getLogInRequest();
    try {
      const apiResponse = await this.authService.login(logInRequest).toPromise();
      if(apiResponse?.status === SUCCESS) {
        this.router.navigate([ROUTER_URLS.HOME])
      }
    } catch (error) {

    }
  }

  async onSignUpSubmit() {
    this.signUpSuccess = false;
    if(this.registerForm.invalid) {
      return;
    }

    const regRequest = this.getRegRequest();
    try {
      const apiResponse = await this.authService.register(regRequest).toPromise();
      if(apiResponse?.status === SUCCESS) {
        this.signUpSuccess = true;
      }
    } catch (error) {

    }
  }

  private getRegRequest() {
    return new RegisterRequest(
      this.signUp.email.value.toLowerCase(),
      this.signUp.passw.value,
      this.signUp.userFn.value.toUpperCase(),
      this.signUp.userLn.value.toLowerCase(),
      this.signUp.userMobile.value
    )
  }

  private getLogInRequest() {
    return new LoginRequest(
      this.signIn.email.value.toLowerCase(),
      this.signIn.passw.value
    )
  }
}
