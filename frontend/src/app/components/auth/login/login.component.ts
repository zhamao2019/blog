import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Location} from '@angular/common';
import {UrlService} from "../../../services/shared/url.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, TokenStorageService],
})
export class LoginComponent implements OnInit {
  form: any;
  loginForm:any;
  user:any;
  isLoggedIn = false;
  isLoginFailed = false;
  previousUrl: string = '';
  errorMessage = '';

  loginRedirectToHomeUrlsList = [
    "/account/password_reset_confirm",
    "/account/register",
    "/account/login",
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
    private urlService: UrlService,
    ) {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""],
    })
    this.user = {
      id: '',
      username: '',
      userprofile: {},
    }
  }

  ngOnInit(): void {
    this.form = {
      username: '',
      password: '',
    }
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onLogin():void {
    this.authService.login(this.form).subscribe(
      data => {
        console.log('data:'+ JSON.stringify(data.user))
        this.tokenStorage.saveToken(data.access);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    // go back to the previous page
    // this.location.back();
    this.goToPrevious();
  }

  goToPrevious(): void {
    let previous = this.urlService.getPreviousUrl();
    console.log("pre url: ",previous);

    if (this.loginRedirectToHomeUrlsList.includes(previous) || previous.includes("/account/password_reset_confirm")) {
      this.router.navigate(["blog/"]);
    }
    else {
      this.router.navigate([previous]);
      console.log(previous);
    }
  }

}

