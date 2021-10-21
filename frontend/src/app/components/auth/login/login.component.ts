import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import {window} from "rxjs/operators";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, TokenStorageService],
})
export class LoginComponent implements OnInit {
  form: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,) { }

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
}
