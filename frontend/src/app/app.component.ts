import {Component,OnInit} from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from  './services/user.service';
import {ProfileService} from "./services/profile.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = "app";
  isLoggedIn = false;
  loginUser:any;

  constructor(
    private tokenStorageService: TokenStorageService,) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
    }
  }

  logout(): void {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
