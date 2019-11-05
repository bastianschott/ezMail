import { Mailinglist, MailinglistBlueprint } from './mailinglist';
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

  getMailinglists$(): Observable<Mailinglist[]> {
    return this.authService.getIdOfCurrentUser$().pipe(
      switchMap(userId => {
        return this.db
          .collection<Mailinglist>('mailinglists', ref => ref.where(`element.${userId}`, '>', ''))
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const mailinglist = a.payload.doc.data() as Mailinglist;
                mailinglist.verteilerId = a.payload.doc.id;
                return mailinglist;
              })
            )
          );
      })
    );
  }

  getList() {
    return this.db.collection('mailinglists', ref => ref.orderBy('verteilerName')).valueChanges();
  }

  createMailinglist(mailinglistBlueprint: MailinglistBlueprint) {
    this.authService
      .getIdOfCurrentUser$()
      .pipe(take(1))
      .subscribe(userId => {
        const mailinglist = {
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
        this.db.collection('mailinglists').add(mailinglist);
      });
  }
}
