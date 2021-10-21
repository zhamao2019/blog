import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users/';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.baseUrl, { responseType: 'text' });
  }

  getUser(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`, {headers: this.httpHeaders});
  }

}
