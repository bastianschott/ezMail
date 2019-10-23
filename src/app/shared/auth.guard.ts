import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    return this.authService.getUserIsLoggedIn$();
  }

  /*
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authentication.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }*/
}
