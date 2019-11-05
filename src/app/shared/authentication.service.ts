import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, first, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  getUserIsLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  getIdOfCurrentUser$(): Observable<string> {
    return this.afAuth.authState.pipe(map(user => (user ? user.uid : '')));
  }

  getMailOfCurrentUser$(): Observable<string> {
    return this.afAuth.authState.pipe(map(user => (user ? user.email : '')));
  }
}
