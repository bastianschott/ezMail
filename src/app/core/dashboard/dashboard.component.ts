import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from './dashboard.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private dataSource = new MatTableDataSource<Mailinglist>();
  private displayedColumns: string[] = [
    'verteilerName',
    'verteilerMail',
    'eigentuemer',
    'mailadressen',
    'privateListe',
    'moderierteListe',
    'action',
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private mailinglistService: MailinglistsService
  ) {}

  ngOnInit() {
    this.authService.setRoutingDestination();
    this.titleService.setTitle('Dashboard | ezMail');

    this.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dashboardService.getMailinglists().subscribe(data => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private openDeleteDialog(mailinglist: Mailinglist): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { mailinglist },
    });
  }

  private toggleCheckbox(mailinglist: Mailinglist, checkbox: string): void {
    if (checkbox === 'privateListe') {
      this.mailinglistService.togglePrivateListe(mailinglist);
    }

    if (checkbox === 'moderierteListe') {
      this.mailinglistService.toggleModerierteListe(mailinglist);
    }
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mailinglistService: MailinglistsService, private snackBar: MatSnackBar) {}

  protected deleteMailinglist(mailinglist: Mailinglist): void {
    this.mailinglistService.deleteMailinglist(mailinglist.verteilerId);
    this.snackBar.open('Verteiler ' + mailinglist.verteilerName + ' erfolgreich gelöscht!', '', { duration: 2000 });
  }
}
