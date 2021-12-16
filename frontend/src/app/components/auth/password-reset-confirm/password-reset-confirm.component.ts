import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css']
})
export class PasswordResetConfirmComponent implements OnInit {
  form: any;
  isConfirmed = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = {
      token: this.route.snapshot.paramMap.get('token'),
      password: '',
      password2: '',
    }
  }

  passwordResetConfirm() {
    console.log('password email:'+ this.form);
    this.authService.password_reset_confirm(this.form).subscribe(
      data => {
        console.log('password reset confirm:'+ data.value);
        this.isConfirmed = true;
        this.showSuccessAlert();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  showSuccessAlert() {
    this.toastr.success('Your Password is Reset', 'Password Reset Successfully');
  }
}
