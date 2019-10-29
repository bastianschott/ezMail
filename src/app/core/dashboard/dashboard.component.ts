import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', id: 1, cols: 1, rows: 1 },
          { title: 'Card 2', id: 2, cols: 1, rows: 1 },
          { title: 'Card 3', id: 3, cols: 1, rows: 1 },
          { title: 'Card 4', id: 4, cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', id: 1, cols: 2, rows: 1 },
        { title: 'Card 2', id: 2, cols: 1, rows: 1 },
        { title: 'Card 3', id: 3, cols: 1, rows: 2 },
        { title: 'Card 4', id: 4, cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private titleService: Title,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // https://medium.com/better-programming/improving-angular-ngfor-performance-through-trackby-ae4cf943b878
  trackByFunction(item: any) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  ngOnInit() {
    this.titleService.setTitle('Dashboard | ezMail');
    console.log('Testttt');

    this.authService
      .getUserIsLoggedIn$()
      .pipe(take(1))
      .subscribe(isauthenticated => {
        if (!isauthenticated) {
          this.router.navigate([{ outlets: { primary: ['login'], toolbar: ['login'] } }]);
        }
      });
  }
}
