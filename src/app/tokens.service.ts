import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "@angular/common";


import { APIResult, APIResultGetAuth } from "./APIResults/APIResults";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  refreshToken: string = undefined;
  authToken: string = undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
    // Load token from storage, check url parameter, request auth token
    let localRefreshToken = localStorage.getItem('refreshToken');
    if (localRefreshToken != undefined)
      this.refreshToken = localRefreshToken;

    this.route.queryParams.subscribe(params => {
      if(params['token'] != undefined) {
        this.refreshToken = params['token'];
        this.authToken = undefined;
        this.location.replaceState('/index')
      }
      console.log(this.refreshToken);
      if (this.refreshToken === undefined) return;

      this.http.get<APIResult>(environment.baseUrl + '/api/auth/token', this.getRefreshTokenHeader()).subscribe(json => {
        if (json.success === 'yes') {
          this.authToken = (<APIResultGetAuth> json).payload.token;
          // Save token to storage
          localStorage.setItem('refreshToken', this.refreshToken);
        } else {
          console.log(json);
          // Clear tokens from memory and storage
          this.logout();
        }
      });
    })
  }

  getRefreshTokenHeader() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.refreshToken })
    };
  }

  getAuthTokenHeader() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authToken })
    };
  }

  login() {
    location.href = environment.baseUrl + '/api/auth/login/steam';
  }

  logout() {
    this.refreshToken = undefined;
    this.authToken = undefined;
    localStorage.removeItem('refreshToken');
  }

  isLogged() {
    return (this.authToken != undefined);
  }
}
