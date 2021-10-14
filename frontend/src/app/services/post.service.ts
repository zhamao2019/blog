import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
// import { Post, UpdatePost } from "../models/post";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8000/api/posts/';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any>{
    return this.http.get(this.baseUrl,
      {headers: this.httpHeaders});
  }

  getPost(id:string): Observable<any>{
    return this.http.get(`${this.baseUrl}${id}/`,
      {headers: this.httpHeaders});
  }

  createPost(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}`, data);
  }

  updatePost(data:any): Observable<any>{
    return this.http.put(`${this.baseUrl}${data.id}/`, data);
  }

  deletePost(id:string): Observable<any>{
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
