import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../services/token-storage.service";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  isLoggedIn = false;
  loginUser:any;

  post = {
    id: '',
    title: '',
    content_body: '',
    author: {
      id: '',
      uuid: '',
      username: '',
      email: '',
    }
  };

  blogForm = this.fb.group({
    title: ['', Validators.required],
    content_body: ['', Validators.required],
  });

  constructor(
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // retrieve and save blog id from url
    let postId = this.route.snapshot.paramMap.get('id');
    this.post.id = postId ? postId: ""

    this.getPost();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
      console.log(this.loginUser)
    }

  }

  getPost() {
    this.postService.getPost(this.post.id).subscribe(
      response => {
        this.post = response;
        console.log('initial blog',response);

        this.blogForm = this.fb.group({
          title: [this.post.title, Validators.required],
          content_body: [this.post.content_body, Validators.required],
        });
        console.log('load initial blog form', this.blogForm.value);
      },
    )
  }

  onSave(){
    console.log('edited blog form', this.blogForm.value);
    this.post.title = this.blogForm.value["title"];
    this.post.content_body = this.blogForm.value["content_body"];
    this.postService.updatePost(this.post).subscribe(
      response => {
        this.post = response;
        console.log('updated blog',response);

        // Redirect to blog detail page
        this.router.navigate(['blog/', this.post.id])
          .then(() => {
            this.showSuccessAlert();
          });
      },
        error => {
        console.log(error)
      },
    )
  }

  showSuccessAlert() {
    this.toastr.success('Your blog is already updated', 'Update Successfully');
  }
}
