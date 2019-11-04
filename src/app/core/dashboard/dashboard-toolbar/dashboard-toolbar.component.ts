import { NewMaillistDialogComponent } from './../../new-maillist-dialog/new-maillist-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss'],
})
export class DashboardToolbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openNewMaillistDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(NewMaillistDialogComponent, {});
  }
}
