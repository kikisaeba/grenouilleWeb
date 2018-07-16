import {EventEmitter, Injectable, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "@angular/common";


import {APIResult, APIResultAuthTokenGet, APIResultUserMeDetails} from "./APIResults/APIResults";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  refreshToken: string = undefined;
  authToken: string = undefined;
  @Output() newRefreshToken: EventEmitter<Boolean> = new EventEmitter();
  @Output() newAuthToken: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
    this.newRefreshToken.subscribe(isValid => {
      if (isValid) {
        this.updateAuthToken();
      } else {
        this.authToken = undefined;
        this.newAuthToken.emit(false);
      }
    });

    this.loadRefreshToken();
  }

  loadRefreshToken(){
    // Load token from storage
    let localRefreshToken = localStorage.getItem('refreshToken');
    if (localRefreshToken != undefined)
      this.refreshToken = localRefreshToken;

    // check url parameter for new refresh token
    this.route.queryParams.subscribe(params => {
      if (params['token'] != undefined) {
        this.refreshToken = params['token'];
        this.authToken = undefined;
        this.location.replaceState('/index')
      }
      if (this.refreshToken === undefined) return;

      this.newRefreshToken.emit(true);
    });
  }

  updateAuthToken() {
    this.http.get<APIResult>(environment.baseUrl + '/api/auth/token', this.getRefreshTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.authToken = (<APIResultAuthTokenGet> json.payload).token;
        localStorage.setItem('refreshToken', this.refreshToken);
        this.newAuthToken.emit(true);
      } else {
        this.clean_tokens();
      }
    });
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

  clean_tokens() {
    this.refreshToken = undefined;
    this.authToken = undefined;
    this.newRefreshToken.emit(false);
    this.newAuthToken.emit(false);
    localStorage.removeItem('refreshToken');
  }

}
