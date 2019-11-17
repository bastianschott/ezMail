import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // https://github.com/RaphaelJenni/FirebaseUI-Angular/blob/master/src/app/main/main.component.ts
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthenticationService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login | ezMail');
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  /**
   * Loggt den aktuellen Benutzer aus.
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Gibt zurück, ob ein Benutzer eingeloggt ist oder nicht.
   * @returns Obervable vom Typ boolean: true, falls ein Benutzer eingeloggt ist.
   */
  isLoggedIn(): Observable<boolean> {
    return this.authService.getUserIsLoggedIn$();
  }

  /**
   * Navigiert auf das Dashboard.
   * @remarks Wird aufgerufen, wenn der Benutzer erfolgreich authentifiziert wurde
   * @param data Daten zum erfolgreich eingeloggten User
   */
  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    // console.log('successCallback', data);
    this.router.navigate([{ outlets: { primary: ['dashboard'], toolbar: ['dashboard'] } }]);
  }

  /**
   * Schreibt den Fehler in die Konsole, falls der User erfolglos authentifiziert wurde
   * @param data Fehlercode
   */
  errorCallback(data: FirebaseUISignInFailure) {
    console.error('errorCallback', data);
  }
}
