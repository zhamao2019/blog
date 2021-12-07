import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {PostService} from "../../../services/post.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  isLoggedIn = false;
  loginUser:any;

  post = {
    id: '',
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
  };

  blogForm = this.fb.group({
    title: ["", Validators.required],
    content_body: ["", Validators.required]
  })

  constructor(
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
    }
  }

  onSubmit(){

  }

  onPublish(){
    this.post.author = this.loginUser
    this.post.title = this.blogForm.value.title
    this.post.content_body = this.blogForm.value.content_body

    console.log("POST DATA", this.post)
    console.log("BLOG FORM VALUE", this.blogForm.value)

    this.postService.createPost(this.post).subscribe(
      response => {
        this.post = response
        this.post.id = response.id
        console.log(response.id);
        this.router.navigate(['blog/', response.id]);
      },
    )
    // console.log('post after', this.post.id);
    // this.router.navigate(['blog/'], response.id);
  }



}
