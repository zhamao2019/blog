import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8000/api/profiles/';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllProfiles(): Observable<any>{
    return this.http.get(this.baseUrl,
      {headers: this.httpHeaders});
  }

  getProfile(id:string): Observable<any>{
    return this.http.get(`${this.baseUrl}${id}/`,
      {headers: this.httpHeaders});
  }

  updateProfile(data:any): Observable<any>{
    return this.http.put(`${this.baseUrl}${data.id}/`, data);
  }
}
