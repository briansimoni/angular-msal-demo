import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  weather!: Object;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getWeatherData();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  getWeatherData() {
    this.http.get('http://localhost:5000/weatherforecast')
    .subscribe(
    (weather) => {
      alert(weather);
      console.log(weather);
      this.weather = weather;
    },
    (error) => {
      console.log(error.message)
    }
    )
  }
}