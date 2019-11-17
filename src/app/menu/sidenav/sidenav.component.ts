import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faBeer, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: any;
  faBeer = faBeer;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  // Gibt ein true zurück, falls das Endgerät ein Handset ist
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  userIsLoggedIn$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.userIsLoggedIn$ = this.authenticationService.getUserIsLoggedIn$();
  }

  /**
   * Loggt den aktuellen Benutzer aus.
   */
  logout(): void {
    this.authenticationService.logout();
    this.userIsLoggedIn$ = this.authenticationService.getUserIsLoggedIn$();
  }

  /**
   * Schließt die Seitennavigation.
   */
  closeSideNav(): void {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Methode, welche auf der Mobilen Ansicht ermöglicht, via Swipe die Seitennavigation zu öffnen.
   * @remarks Mit HammerJS realisiert.
   * @param evt Gezogene Linie
   */
  onSwipe(evt: any): void {
    if (this.drawer.mode === 'over') {
      const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? this.drawer.open() : this.drawer.close()) : '';
    }
  }
}
