import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokensService} from "../tokens.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-stats-scene',
  templateUrl: './stats-scene.component.html',
  styleUrls: ['./stats-scene.component.css']
})
export class StatsSceneComponent implements OnInit {

  constructor(
    private tokenService: TokensService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenService.refreshToken == undefined) {
      this.router.navigate(['/index']);
      return;
    }
    if (this.tokenService.authToken != undefined)
      this.refreshUI();
    this.tokenService.newAuthToken.subscribe(isValid => {
      if (isValid) {
        this.refreshUI();
      } else {
        this.resetUI();
      }
    });
  }

  resetUI() {

  }

  refreshUI() {

  }

}
