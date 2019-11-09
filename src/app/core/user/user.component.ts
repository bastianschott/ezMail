import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
