import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  count : number = 0;
  constructor() { }

  ngOnInit(): void {
  }
}
