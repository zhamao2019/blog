import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class UrlService {
  previousUrl: string = "";
  currentUrl: string = "";

  constructor(
    private router: Router,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }
}
