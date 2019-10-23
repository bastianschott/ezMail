import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Benutzer | ezMail');
  }

  ngOnInit() {}
}
