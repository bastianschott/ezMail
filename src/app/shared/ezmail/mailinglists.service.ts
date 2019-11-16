import { Mailinglist, MailinglistTemplate } from './mailinglist';
import { AuthenticationService } from './../authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailinglistsService {
  /**
   * Verwaltung der Mailinglisten.
   * @remarks Der Service erlaubt die Verwaltung der Listen innerhalb der Datenbank.
   * @param db AngularFirestore
   * @param authService Authenticationservice
   */
  constructor(private db: AngularFirestore, private authService: AuthenticationService) {}

  /**
   * Liefert alle Mailinglisten, auf die der eingeloggte Benutzer zugriff hat, zurück.
   * @returns Mailinglisten des Benutzers
   */
  getMailinglist$(): Observable<Mailinglist[]> {
    return this.authService.getIdOfCurrentUser$().pipe(
      switchMap(userId => {
        if (!userId) {
          return of([]);
        }
        return this.db
          .collection<Mailinglist[]>('mailinglists', ref => ref.where('userId', '==', userId))
          .valueChanges();
      })
    );
  }

  /**
   * Erstellt eine neue Mailingliste aus einer Vorlage und speichert diese in die Datenbank ab.
   * @param mailinglistTemplate Initiale Vorlage einer Mailingliste
   */
  createMailinglist(mailinglistTemplate: MailinglistTemplate) {
    if (this.checkIfMailAlreadyExists(mailinglistTemplate.verteilerMail)) {
      console.warn('Mail already in use');
      return;
    }
    this.authService
      .getIdOfCurrentUser$()
      .pipe(take(1))
      .subscribe(userId => {
        const mailinglist = {
          verteilerId: '',
          verteilerName: mailinglistTemplate.verteilerName,
          verteilerMail: mailinglistTemplate.verteilerMail,
          mailadressen: mailinglistTemplate.mailadressen,
          eigentuemer: mailinglistTemplate.eigentuemer,
          privateListe: mailinglistTemplate.privateListe,
          moderierteListe: mailinglistTemplate.moderierteListe,
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

  getSingleMailinglist$(verteilerId: string): Observable<Mailinglist> {
    return this.db
      .collection<Mailinglist>('mailinglists')
      .doc<Mailinglist>(verteilerId)
      .valueChanges();
  }

  updateMailinglist(mailinglist: Mailinglist): void {
    console.log(mailinglist);
    this.db
      .collection('mailinglists')
      .doc(mailinglist.verteilerId)
      .update({
        eigentuemer: mailinglist.eigentuemer,
        mailadressen: mailinglist.mailadressen,
        moderierteListe: mailinglist.moderierteListe,
        privateListe: mailinglist.privateListe,
        timeModified: Date.now(),
        verteilerMail: mailinglist.verteilerMail,
        verteilerName: mailinglist.verteilerName,
      });
  }

  /**
   * Löscht die Mailingliste
   * @param verteilerId ID der zu löschenden Mailingliste
   */
  deleteMailinglist(verteilerId: string): void {
    this.db
      .collection<Mailinglist[]>('mailinglists')
      .doc(verteilerId)
      .delete();
    console.log('Mailinglist with ID: ' + verteilerId + ' deleted');
  }

  /**
   * Prüft, ob die Mailadresse bereits in einer anderen Mailingliste, unabhängig des Benutzers, vorhanden ist. NICHT LAUFFÄHIG!
   * @param mail Zu prüfende Mail-Adresse
   * @returns true, wenn bereits vorhanden, ansonsten false
   * @
   */
  checkIfMailAlreadyExists(mail: string): boolean {
    // TODO: Logik, welche prüft, ob die mail bereits vorhanden ist
    const list = this.db.collection('mailinglists', ref => ref.where('verteilerMail', '==', mail));
    list.get();
    console.log('checkIfMailAlreadyExists ' + list);
    return false;
  }

  /**
   * Ändert das boolean-Feld "Private Liste"
   * @param mailinglist Liste, in der privateListe aktualisiert werden soll
   */
  togglePrivateListe(mailinglist: Mailinglist): void {
    this.db
      .collection<Mailinglist[]>('mailinglists')
      .doc(mailinglist.verteilerId)
      .update({
        privateListe: !mailinglist.privateListe,
        timeModified: Date.now(),
      });
  }

  /**
   * Ändert das boolean-Feld "Moderierte Liste"
   * @param mailinglist Liste, in der moderierteListe aktualisiert werden soll
   */
  toggleModerierteListe(mailinglist: Mailinglist): void {
    this.db
      .collection<Mailinglist[]>('mailinglists')
      .doc(mailinglist.verteilerId)
      .update({
        moderierteListe: !mailinglist.moderierteListe,
        timeModified: Date.now(),
      });
  }

  /**
   * Aktualisiert das Feld timeModified der eingegebenen Mailingliste.
   * @param mailinglist Liste, in der timeModified aktualisiert werden soll
   * @deprecated Sollte in den jeweiligen Methoden direkt aktualisiert werden, um doppelte Datenbank-Zugriffe zu vermeiden.
   */
  private updateTimeModified(mailinglist: Mailinglist) {
    this.db
      .collection<Mailinglist[]>('mailinglists')
      .doc(mailinglist.verteilerId)
      .update({ timeModified: Date.now() });
  }
}
