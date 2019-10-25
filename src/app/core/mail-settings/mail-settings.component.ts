import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-settings',
  templateUrl: './mail-settings.component.html',
  styleUrls: ['./mail-settings.component.scss'],
})
export class MailSettingsComponent implements OnInit {
  constructor(private titleService: Title, private authGuard: AuthGuard, private router: Router) {
    this.titleService.setTitle('Mail Einstellungen | ezMail');

    if (this.authGuard.canActivate()) {
      this.router.navigate([{ outlets: { primary: ['login'], toolbar: ['login'] } }]);
    }
  }

  ngOnInit() {}
}
