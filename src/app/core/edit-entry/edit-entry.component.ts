import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { MailinglistTemplate } from 'src/app/shared/ezmail/mailinglist';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss'],
})
export class EditEntryComponent implements OnInit {
  // Responsive: https://stackoverflow.com/a/52989737/11061015
  smallScreen: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEntryComponent>,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private mailinglistService: MailinglistsService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.smallScreen = result.matches;
      this.titleService.setTitle('Mail Bearbeiten | ezMail');
    });

    this.firstFormGroup = this.formBuilder.group({
      verteilerName: ['Test-Verteiler', Validators.required],
      verteilerMail: ['testverteileradresse@bschott.de', Validators.email],
    });
  }

  setCompletedForm1(): boolean {
    return true;
  }

  getErrorMessageForm1(): string {
    return 'Eingaben fehlen';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.mailinglistService.createMailinglist(this.createMailinglist());
    this.dialogRef.close();
  }

  createMailinglist(): MailinglistTemplate {
    const mailinglist = {
      verteilerName: this.firstFormGroup.value.verteilerName,
      verteilerMail: this.firstFormGroup.value.verteilerMail,

      mailadressen: this.secondFormGroup.value.mailadressen,

      eigentuemer: this.thirdFormGroup.value.eigentuemer,
      privateListe: this.thirdFormGroup.value.privateListe,
      moderierteListe: this.thirdFormGroup.value.moderierteListe,
    } as MailinglistTemplate;

    return mailinglist;
  }
}
