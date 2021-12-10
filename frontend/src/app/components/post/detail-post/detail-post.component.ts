import { Component, OnInit } from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import {map} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";
import {TokenStorageService} from "../../../services/token-storage.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  providers: [PostService,CommentService, DatePipe],
})
export class DetailPostComponent implements OnInit {
  post: any;
  comments: any;
  comment: any;
  commentForm: any;

  isLoggedIn = false;
  loginUser:any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private location: Location
  ) {
    this.post = {
      id: '',
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
        id: '',
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
    ];

    this.comment = {
      id: '',
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
    }

    this.commentForm = {
      comment: "",
    }
  }

  ngOnInit(): void {
    this.getPost(this.post.id);
    this.getCommentsByPostId(this.post.id);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
    }
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
        response => response.filter((comment: any) => comment.post_id == id)
      ))
      .subscribe(
      response => {
        this.comments = response
        console.log('comment',response);
        console.log('comment',this.comments);
      },
    )
  }

  deleteBlog() {
    if(confirm("Are you sure to delete?")) {
      this.postService.deletePost(this.post.id).subscribe(
        response => {
          this.post = response;
          this.router.navigate(['blog/'])
            .then(() => {
            this.showSuccessAlert('Delete Successfully','Your blog is already deleted');
          });
        },
      )
    }
  }

  createComment() {
    this.comment.comment = this.commentForm.comment
    this.comment.post_id = this.post.id
    this.comment.user.id = this.loginUser.id

    this.commentService.createComment(this.comment).subscribe(
      response => {
        console.log('resp',response)
        this.comment = response;

        location.reload();
      },
    )
    this.showSuccessAlert('Create Successfully','Your comment is created');
  }

  deleteComment(id:any) {
    if(confirm("Are you sure to delete?")) {
      this.commentService.deleteComment(id).subscribe(
        response => {
          console.log('resp', response)
          this.comment = response;

          this.location.back();
        },
      )
      this.showSuccessAlert('Create Successfully', 'Your comment is created');
    }
  }

  onLogin() {
    this.router.navigate(['account/login']);
  }

  showSuccessAlert(title:string, msg:string) {
    this.toastr.success(msg, title);
  }

}
