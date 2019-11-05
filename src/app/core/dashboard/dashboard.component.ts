import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'verteilerName',
    'verteilerMail',
    'eigentuemer',
    'mailadressen',
    'privateListe',
    'moderierteListe',
    'action',
  ];
  dataSource = new MailinglistDataSource(this.mailinglistsService);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private authService: AuthenticationService,
    private router: Router,
    private mailinglistsService: MailinglistsService
  ) {}

  delete(verteilerMail: string) {
    this.mailinglistsService.deleteMailinglist(verteilerMail);
  }

  ngOnInit() {
    this.titleService.setTitle('Dashboard | ezMail');
    this.paginator = this.paginator;

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

export class MailinglistDataSource extends DataSource<any> {
  constructor(private mailinglistsService: MailinglistsService) {
    super();
  }

  connect() {
    return this.mailinglistsService.getMailinglist$();
  }

  disconnect(): void {}
}
