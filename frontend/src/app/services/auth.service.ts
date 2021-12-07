import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_LOGIN_API = 'http://localhost:8000/api-token-auth/';
  AUTH_REGISTER_API = 'http://localhost:8000/api/register/';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient,) {}

  login(credentials:any): Observable<any> {
    return this.http.post(this.AUTH_LOGIN_API, {
      username: credentials.username,
      password: credentials.password
    }, {headers: this.httpHeaders});
  }

  register(user:any): Observable<any> {
    return this.http.post(this.AUTH_REGISTER_API, {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2,
    }, {headers: this.httpHeaders});
  }
}
