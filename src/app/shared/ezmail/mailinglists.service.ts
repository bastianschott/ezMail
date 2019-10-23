import { Mailinglist } from './mailinglist';
import { AuthenticationService } from './../authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { switchMap, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MailinglistsService {
  constructor(private db: AngularFirestore, private authService: AuthenticationService) {}

  getMailinglists$() {
    return this.authService.getIdOfCurrentUser$().pipe(
      switchMap(userId => {
        return this.db
          .collection<Mailinglist>('mailinglists', ref => ref.where(`members.${userId}`, '>', ''))
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const mailinglist = a.payload.doc.data() as Mailinglist;
                mailinglist.maillistId = a.payload.doc.id;
                return mailinglist;
              })
            )
          );
      })
    );
  }

  createMailinglist(mailinglist: Mailinglist) {
    this.db.collection('mailinglist').add(mailinglist);
  }
}
