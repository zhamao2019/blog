import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
// import { Post, UpdatePost } from "../models/post";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private PostAPI = 'http://localhost:8000/api/posts/';
  private PostHistoryAPI = 'http://localhost:8000/api/posts/author/';

  httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any>{
    return this.http.get(this.PostAPI,
      {headers: this.httpHeaders});
  }

  getPost(id:string): Observable<any>{
    return this.http.get(`${this.PostAPI}${id}/`,
      {headers: this.httpHeaders});
  }

  getPostsByUserId(id:string): Observable<any>{
    return this.http.get(`${this.PostHistoryAPI}${id}/`,
      {headers: this.httpHeaders});
  }

  createPost(data:any): Observable<any>{
    return this.http.post(`${this.PostAPI}`, data);
  }

  updatePost(data:any): Observable<any>{
    return this.http.put(`${this.PostAPI}${data.id}/`, data);
  }

  deletePost(id:string): Observable<any>{
    return this.http.delete(`${this.PostAPI}${id}/`);
  }
}
