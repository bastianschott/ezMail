import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  /**
   * Prüft die Berechtigung eines Benutzers.
   * @remarks Wird benutzt, ob ein Benutzer bestimmte Routen verwenden darf oder nicht.
   * @returns Ein Observable vom Typ boolean. True, falls ein Benutzer eingeloggt ist, false wenn nicht.
   */
  canActivate(): Observable<boolean> {
    return this.authService.getUserIsLoggedIn$();
  }
}
