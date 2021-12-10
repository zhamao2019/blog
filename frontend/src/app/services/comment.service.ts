import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private CommentAPI = 'http://localhost:8000/api/comments/';
  private CommentListAPI = 'http://localhost:8000/api/comments/post/';
  httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<any>{
    return this.http.get(this.CommentAPI,
      {headers: this.httpHeaders});
  }

  getCommentsByBlogId(id:string): Observable<any>{
    return this.http.get(`${this.CommentListAPI}${id}/`,
      {headers: this.httpHeaders});
  }

  createComment(data:any): Observable<any>{
    return this.http.post(this.CommentAPI, data,{headers: this.httpHeaders});
  }

  deleteComment(id:string): Observable<any>{
    return this.http.delete(`${this.CommentAPI}${id}/`, {headers: this.httpHeaders});
  }

}
