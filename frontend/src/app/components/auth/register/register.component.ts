import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService, UserService],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isRegiaterFailed = false;
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private router: Router,) {}

  ngOnInit(): void {
    this.form = {
        username: "",
        email: "",
        password: "",
        password2: "",
    }
  }

  onRegister():void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegiaterFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRegiaterFailed = true;
      }
    );
    this.router.navigate(['account/login']);
  }
}
