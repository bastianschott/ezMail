import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class DashboardService {
  // https://stackoverflow.com/questions/47261190/angular-material-mattabledatasource-with-firestore/47274576
  private mailinglists: Observable<Mailinglist[]>;

  constructor(private titleService: Title, public db: AngularFirestore, private mailinglistsService: MailinglistsService) {
    this.titleService.setTitle('Benutzer | ezMail');
    this.mailinglists = this.mailinglistsService.getMailinglist$();
  }

  getMailinglists() {
    return this.mailinglists;
  }
}
