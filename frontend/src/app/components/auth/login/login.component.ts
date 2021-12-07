import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../services/user.service";


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
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
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

    this.router.navigate(['']);
  }

  onLogOut(){

  }

}

