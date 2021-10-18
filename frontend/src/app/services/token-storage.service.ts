import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log('save: '+ window.sessionStorage.getItem(TOKEN_KEY));
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('saveuser: '+ window.sessionStorage.getItem(USER_KEY))
  }

  public getUser(): any {
    // return sessionStorage.getItem(USER_KEY)!;
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
    console.log('user: '+ JSON.parse(sessionStorage.getItem(USER_KEY)!))
  }
}
