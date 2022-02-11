import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  WEATHER_API = "https://community-open-weather-map.p.rapidapi.com/weather?q=ottawa&units=metric";
  querystring = {"q":"Ottawa","lat":"0","lon":"0","callback":"test","id":"2172797","units":"metric","mode":"xml"}

  httpHeaders = new HttpHeaders({
    'Content-type':'application/json',
    'X-RapidAPI-Host':'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key':'fe0557b4b6msh2c3991012856b2bp14a8cejsn239047ebd723',
    }
  );

  constructor(private http: HttpClient,) {}

  getWeather(): Observable<any>{
    return this.http.get(this.WEATHER_API,
      {headers: this.httpHeaders},
    );
  }


}
