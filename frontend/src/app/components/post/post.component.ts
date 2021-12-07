import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { PostService } from '../../services/post.service';
import {CommentService} from "../../services/comment.service";

// import { Post } from "../../models/post";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, DatePipe],
})
export class PostComponent implements OnInit {
  posts = [{
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

  }];

  selectedPost: any;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    public datepipe: DatePipe,
  ) {
    this.selectedPost = {
      id: -1,
      uuid: '',
      title: '',
      author: {
        username: '',
        uuid: '',
        email: '',
        userprofile: {
          id: '',
        }
      },
      content_body: '',
      published_at:'',
    }
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts = () => {
    this.postService.getAllPosts().subscribe(
      response => {
        this.posts = response
        for (let post of this.posts){
          const bodyText = this.htmlToPlaintext(post.content_body);
          post.content_body = bodyText;
        }
        console.log('res', response)
      },
      error => {
        console.log(error)
      },
    )
  }

  onPost = (id:string) => {
    this.postService.getPost(id).subscribe(
      response => {
        this.selectedPost = response
        this.selectedPost.published_at = this.datepipe.transform(this.selectedPost.published_at, "yyyy-MM-dd");
        console.log('selectedpost', this.selectedPost);
        },
    )
  }

  updatePost = (post:any) => {
    this.selectedPost = this.postService.getPost(post.id.toString())
    this.postService.updatePost(this.selectedPost).subscribe(
      response => {
        this.selectedPost = response

        console.log('res', response)
      },
    )
  }

  createPost = (post:any) => {
    const data = {}
    this.postService.createPost(post).subscribe(
      response => {
        this.selectedPost = response
        console.log('res', response)
      },
    )
  }

  htmlToPlaintext(text:string) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = text;
    return tmp.textContent || tmp.innerText || "";
  }
}
