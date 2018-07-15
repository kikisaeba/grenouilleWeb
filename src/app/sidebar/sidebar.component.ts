import { Component, OnInit } from '@angular/core';

import { TokensService } from "../tokens.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public tokens: TokensService
  ) { }

  ngOnInit() {
  }

}
