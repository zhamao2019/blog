import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { PostService } from '../../services/post.service';
import {CommentService} from "../../services/comment.service";
import {WeatherService} from "../../services/external/weather.service";

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
  cityWeather: any;

  constructor(
    private postService: PostService,
    private weatherService: WeatherService,
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

    this.cityWeather = {
      "coord": {
        "lon": -75.6981,
        "lat": 45.4112
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 275.81,
        "feels_like": 273.53,
        "temp_min": 274.88,
        "temp_max": 277.75,
        "pressure": 1004,
        "humidity": 66
      },
      "visibility": 10000,
      "wind": {
        "speed": 2.24,
        "deg": 238,
        "gust": 6.71
      },
      "clouds": {
        "all": 100
      },
      "dt": 1644602559,
      "sys": {
        "type": 2,
        "id": 2005537,
        "country": "CA",
        "sunrise": 1644581433,
        "sunset": 1644618220
      },
      "timezone": -18000,
      "id": 6094817,
      "name": "Ottawa",
      "cod": 200
    }
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.getWeather();
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

  getWeather(){
    this.weatherService.getWeather().subscribe(
      response => {
        this.cityWeather = response
        console.log('weather', response)
      }
    )
  }

  htmlToPlaintext(text:string) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = text;
    return tmp.textContent || tmp.innerText || "";
  }
}
