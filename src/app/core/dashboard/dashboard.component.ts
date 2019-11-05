import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  mailinglists: Mailinglist[];
  displayedColumns = ['verteilerName', 'verteilerMail', 'eigentuemer', 'mailadressen', 'privateListe', 'moderierteListe', 'action'];
  dataSource = new MailinglistDataSource(this.mailinglistsService);

  constructor(
    private titleService: Title,
    private authService: AuthenticationService,
    private router: Router,
    private mailinglistsService: MailinglistsService
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

    this.authService
      .getUserIsLoggedIn$()
      .pipe(take(1))
      .subscribe(isauthenticated => {
        if (!isauthenticated) {
          this.router.navigate([{ outlets: { primary: ['login'], toolbar: ['login'] } }]);
        }
      });

    this.mailinglistsService
      .getMailinglists$()
      .pipe(take(1))
      .subscribe(list => {
        this.mailinglists = list;
        console.log(list);
      });
    console.log(this.mailinglists);
  }
}

export class MailinglistDataSource extends DataSource<any> {
  constructor(private mailinglistsService: MailinglistsService) {
    super();
  }

  connect() {
    return this.mailinglistsService.getList();
  }

  disconnect(): void {}
}
