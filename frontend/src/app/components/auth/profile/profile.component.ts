import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";

import { TokenStorageService } from '../../../services/token-storage.service';
import { ProfileService } from "../../../services/profile.service";
import {PostService} from "../../../services/post.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile = {
    "id": "",
    "avatar": "",
    "bio": "",
    "user": {
      "id": "",
      "uuid": "",
      "username": "",
      "email": "",
      "date_joined": "",
      "last_login": ""
    }
  }
  profile_pk: any;
  posts: any;

  edit:boolean = false;
  isLoggedIn = false;
  loginUser:any;
  profileForm = this.fb.group({
    id: [this.route.snapshot.paramMap.get('id')],
    bio: ["", Validators.required],
  })

  constructor(
    private token: TokenStorageService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
    private route: ActivatedRoute,
    ) {}


  ngOnInit(): void {
    this.getProfile();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const loginUser = this.tokenStorageService.getUser();
      this.loginUser = loginUser
      console.log(this.loginUser)
    }
  }

  getProfile = () => {
    this.profile_pk = this.route.snapshot.paramMap.get('id');

    this.profileService.getProfile(this.profile_pk).subscribe(
      data => {
        this.profile = data
        console.log('profile data',this.profile)

        this.postService.getPostsByUserId(this.profile.user.id).subscribe(
          data => {
            this.posts = data
            console.log('posts data',data)
          },
          error => {
            console.log(error)
          },
        )
      },
      error => {
        console.log(error)
      },
    )
  }

  updateProfile() {
    // $event.preventDefault();
    this.edit = false;

    console.log('update', this.profileForm.value)

    this.profileService.updateProfile(this.profileForm.value).subscribe(
      response => {
        this.profile = response
        // this.selectedPost.published_at = this.datepipe.transform(this.selectedPost.published_at, "yyyy-MM-dd");
        console.log(response);
      },
    )
  }
}
