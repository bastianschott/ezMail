import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-sidenav',
  templateUrl: './new-sidenav.component.html',
  styleUrls: ['./new-sidenav.component.scss'],
})
export class NewSidenavComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {}
}
