import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  selectedPost: any;

  constructor(
    private token: TokenStorageService,
    private profileService: ProfileService,
    private postService: PostService,
    private route: ActivatedRoute,
    ) {}


  ngOnInit(): void {
    this.getProfile();
    // this.getPostsByUserId();
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

  onPost = (id:string) => {
    this.postService.getPost(id).subscribe(
      response => {
        this.selectedPost = response
        // this.selectedPost.published_at = this.datepipe.transform(this.selectedPost.published_at, "yyyy-MM-dd");
        console.log('selectedpost', response);
      },
    )
  }
}
