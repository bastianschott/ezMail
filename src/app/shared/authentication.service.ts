import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, first, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user: Observable<User>;

  /**
   * Der Service authentifiziert einen Nutzer. Darüber hinaus gibt es Funktionen, mit denen Nutzerdaten abgefragt werden können.
   * @param router Angular Router
   * @param afAuth AngularFireAuth
   * @param afs AngularFirestore
   */
  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>('users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * Setzt die neuen Nutzerdaten in der Datenbank.
   * @param user Neue Nutzerdaten
   * @deprecated Hat keinen Effekt, da es keine Datenbank mit Nutzerdaten gibt.
   */
  private updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/' + user.uid);

    const data: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * Loggt den aktuellen Benutzer aus.
   */
  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  /**
   * Gibt zurück, ob ein Benutzer eingeloggt ist oder nicht.
   * @returns Obervable vom Typ boolean: true, falls ein Benutzer eingeloggt ist.
   */
  getUserIsLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  /**
   * Sucht die UserID des eingeloggten Benutzers und gibt diese zurück.
   * @returns Observable mit der UserID des eingeloggten Benutzers.
   */
  getIdOfCurrentUser$(): Observable<string> {
    return this.afAuth.authState.pipe(map(user => (user ? user.uid : '')));
  }

  /**
   * Sucht die Mailadresse des eingeloggten Benutzers und gibt diese zurück.
   * @returns Observable mit der Mail des eingeloggten Benutzers.
   */
  getMailOfCurrentUser$(): Observable<string> {
    return this.afAuth.authState.pipe(map(user => (user ? user.email : '')));
  }

  /**
   * Falls kein Benutzer eingeloggt ist, setzt die Funktion das Routerziel auf Login.
   */
  setRoutingDestination(): void {
    this.getUserIsLoggedIn$()
      .pipe(take(1))
      .subscribe(isauthenticated => {
        if (!isauthenticated) {
          this.router.navigate([{ outlets: { primary: ['login'], toolbar: ['login'] } }]);
        }
      });
  }
}
