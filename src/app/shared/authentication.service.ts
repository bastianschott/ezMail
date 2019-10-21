import { map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth) {}

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  doSomething(): boolean {
    const user = this.afAuth.authState.pipe(first()).toPromise();
    return user ? true : false;
  }

  getUserIsLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }
}
