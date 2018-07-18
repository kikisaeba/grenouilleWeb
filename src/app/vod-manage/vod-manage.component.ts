import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokensService} from "../tokens.service";

@Component({
  selector: 'app-vod-manage',
  templateUrl: './vod-manage.component.html',
  styleUrls: ['./vod-manage.component.css']
})
export class VodManageComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokensService
  ) {}

  ngOnInit() {
    if (this.tokenService.refreshToken == undefined) {
      this.router.navigate(['/index']);
      return;
    }
  }

}
