import {Component,OnInit} from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from  './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoggedIn = false;
  user:any;

  constructor(private tokenStorageService: TokenStorageService,) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.user = user
    }
  }

  logout(): void {
    this.tokenStorageService.logOut();
    window.location.reload();
  }

}
