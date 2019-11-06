import { Mailinglist, MailinglistTemplate } from './mailinglist';
import { AuthenticationService } from './../authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { switchMap, map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailinglistsService {
  constructor(private db: AngularFirestore, private authService: AuthenticationService) {}

  getMailinglist$() {
    return this.authService.getIdOfCurrentUser$().pipe(
      switchMap(userId => {
        if (!userId) {
          return of([]);
        }
        return this.db.collection('mailinglists', ref => ref.where('userId', '==', userId)).valueChanges();
      })
    );
  }

  createMailinglist(mailinglistBlueprint: MailinglistTemplate) {
    if (this.checkIfMailAlreadyExists(mailinglistBlueprint.verteilerMail)) {
      console.warn('Mail already in use');
      return;
    }
    this.authService
      .getIdOfCurrentUser$()
      .pipe(take(1))
      .subscribe(userId => {
        const mailinglist = {
          verteilerId: '',
          verteilerName: mailinglistBlueprint.verteilerName,
          verteilerMail: mailinglistBlueprint.verteilerMail,
          mailadressen: mailinglistBlueprint.mailadressen,
          eigentuemer: mailinglistBlueprint.eigentuemer,
          privateListe: mailinglistBlueprint.privateListe,
          moderierteListe: mailinglistBlueprint.moderierteListe,
          userId,
          timeCreated: Date.now(),
          timeModified: 0,
        } as Mailinglist;
        this.db
          .collection('mailinglists')
          .add(mailinglist)
          .then(ref => {
            this.db
              .collection('mailinglists')
              .doc(ref.id)
              .update({ verteilerId: ref.id });
          });
      });
  }

  deleteMailinglist(verteilerId: string) {
    this.db
      .collection('mailinglists')
      .doc(verteilerId)
      .delete();
    console.log('Mailinglist with ID: ' + verteilerId + ' deleted');
  }

  checkIfMailAlreadyExists(mail: string): boolean {
    // TODO: Logik, welche prüft, ob die mail bereits vorhanden ist
    const list = this.db.collection('mailinglists', ref => ref.where('verteilerMail', '==', mail));
    list.get();
    console.log('checkIfMailAlreadyExists ' + list);
    return false;
  }
}
