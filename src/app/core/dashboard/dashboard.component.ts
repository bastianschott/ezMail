import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Mailinglist>();
  displayedColumns: string[] = [
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
    private mailinglistService: MailinglistsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.setRoutingDestination();
    this.titleService.setTitle('Dashboard | ezMail');

    this.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.mailinglistService.getMailinglist$().subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Filterfunktion für das Suchfeld.
   * @remarks {@link https://stackoverflow.com/a/48540498}
   * @param filterValue String, nach welchem gesucht wird
   */
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * routet zur EditEntryComponent
   * @param mailinglist Die Mailinglist, welche bearbeitet werden soll.
   */
  openEdit(mailinglist: Mailinglist): void {
    const route = 'edit/' + mailinglist.verteilerId;
    this.router.navigate([route]);
  }

  /**
   * Öffnet einen Material Dialog in der gefragt wird, ob die Mailinglist wirklich gelöscht werden soll.
   * @param mailinglist Die zu löschende Mailinglist
   */
  openDeleteDialog(mailinglist: Mailinglist): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { mailinglist },
    });
  }

  /**
   * Wechselt die boolean-Werte von Moderierte Liste und Private Liste.
   * @param mailinglist die Mailinglist, in der die Änderung vorgenommen werden soll
   * @param checkbox 'privateListe' oder 'moderierteListe'
   */
  toggleCheckbox(mailinglist: Mailinglist, checkbox: string): void {
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
  /**
   * Kleiner Dialog, welcher eine zusätzliche Abfrage erzwingt, damit eine Mailinglist nicht versehentlich gelöscht wird.
   * @param data Daten der Mailinglist
   * @param mailinglistService Service zum löschen der Mailinglist
   * @param snackBar Material Snack Bar
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mailinglistService: MailinglistsService, private snackBar: MatSnackBar) {}

  /**
   * Löscht die Mailinglist permanent.
   * @param mailinglist Die zu löschende Mailinglist
   */
  deleteMailinglist(mailinglist: Mailinglist): void {
    this.mailinglistService.deleteMailinglist(mailinglist.verteilerId);
    this.snackBar.open('Verteiler ' + mailinglist.verteilerName + ' erfolgreich gelöscht!', '', { duration: 2000 });
  }
}
