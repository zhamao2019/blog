import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  providers: [PostService,CommentService, DatePipe],
})
export class DetailPostComponent implements OnInit {
  post: any;
  comments: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    public datepipe: DatePipe,
  ) {
    this.post = {
      id: '-1',
      uuid: '',
      title: '',
      author: {
        id: '',
        username: '',
        uuid: '',
        email: '',
        userprofile: {
          id: '',
        },
      },
      content_body: '',
      published_at:'',
    }
    this.post.id = this.route.snapshot.paramMap.get('id');

    this.comments = [
      {
        id: '-1',
        user: {
          id: '',
          username: '',
          uuid: '',
          email: '',
          userprofile: {
            id: '',
            avatar: '',
            bio: '',
          },
        },
        post_id: '',
        comment: '',
        created_at: '',
      },
    ]
  }
  ngOnInit(): void {
    this.getPost(this.post.id);
    this.getCommentsByPostId(this.post.id);
  }

  getPost = (id:string) => {
    this.postService.getPost(id).subscribe(
      response => {
        this.post = response
        this.post.published_at = this.datepipe.transform(this.post.published_at, "yyyy-MM-dd");
        console.log('post',response);
      },
    )
  }

  getCommentsByPostId = (id:string) => {
    this.commentService.getAllComments()
      .pipe(map(
        response => response.results.filter((comment: any) => comment.post_id == id)
      ))
      .subscribe(
      response => {
        this.comments = response
        console.log('comment',response);
        console.log('comment',this.comments);
      },
    )
  }

}
