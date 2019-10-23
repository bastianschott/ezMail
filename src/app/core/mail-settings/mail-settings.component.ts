import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mail-settings',
  templateUrl: './mail-settings.component.html',
  styleUrls: ['./mail-settings.component.scss'],
})
export class MailSettingsComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Mail Einstellungen | ezMail');
  }

  ngOnInit() {}
}
