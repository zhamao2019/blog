import {Component,OnInit} from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from  './services/user.service';
import {ProfileService} from "./services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";


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
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
    }
  }

  goToProfilePage(){
    this.router.navigate(['account/profile/', this.loginUser.userprofile])
      .then(() => {
        window.location.reload();
      });
  }

  logout(): void {
    this.tokenStorageService.logOut();
    window.location.reload();
  }
}
