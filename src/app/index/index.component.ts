import { Component, OnInit } from '@angular/core';

import { TokensService } from "../tokens.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  authToken: string = '';

  constructor(
    public tokens: TokensService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.tokens.login();
  }

  logout() {
    this.tokens.logout();
  }
}
