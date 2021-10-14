import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { PostService } from '../../services/post.service';

// import { Post } from "../../models/post";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, DatePipe],
})
export class PostComponent implements OnInit {
  // posts: Post[] = []
  posts = [{
    id: '',
    uuid: '',
    title: '',
    author: {
      username: '',
      uuid: '',
      email: '',
    },
    content_body: '',
    published_at:'',

  }];

  selectedPost: any;

  constructor(
    private postService: PostService,
    public datepipe: DatePipe,
  ) {
    // this.getAllPosts()
    this.selectedPost = {
      id: -1,
      uuid: '',
      title: '',
      author: {
        username: '',
        uuid: '',
        email: '',
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
        this.posts = response.results
        console.log('res', response.results)
      },
      error => {
        console.log(error)
      },
    )
    console.log(this.posts)

  }

  onPost = (id:string) => {
    this.postService.getPost(id).subscribe(
      response => {
        this.selectedPost = response
        this.selectedPost.published_at = this.datepipe.transform(this.selectedPost.published_at, "yyyy-MM-dd");
        console.log('selectedpost', response);
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

  getDate = (datetime: any) => {
    const _date = new Date(datetime);

    // return new Date(
    //   Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate())
    // );
  }

}
