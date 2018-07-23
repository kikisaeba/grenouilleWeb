import { Component, OnInit } from '@angular/core';
import {TokensService} from "../tokens.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stats-csv',
  templateUrl: './stats-csv.component.html',
  styleUrls: ['./stats-csv.component.css']
})
export class StatsCsvComponent implements OnInit {

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
