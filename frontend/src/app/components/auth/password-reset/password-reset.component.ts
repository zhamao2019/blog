import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  form: any;
  isSent = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = {
      email: '',
    }
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  passwordReset() {
    console.log('password email:'+ this.form.email);
    this.authService.password_reset_request(this.form.email).subscribe(
      data => {
        console.log('password reset:'+ data.status);
        this.isSent = true;
        this.showSuccessAlert();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  showSuccessAlert() {
    this.toastr.success('Email Sent', 'Password Reset Email Sent Successfully');
  }

}
