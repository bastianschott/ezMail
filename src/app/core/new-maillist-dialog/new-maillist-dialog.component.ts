import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogData } from './../../menu/toolbar/toolbar.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { Mailinglist, MailinglistBlueprint } from 'src/app/shared/ezmail/mailinglist';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';

@Component({
  selector: 'app-new-maillist-dialog',
  templateUrl: './new-maillist-dialog.component.html',
  styleUrls: ['./new-maillist-dialog.component.scss'],
})
export class NewMaillistDialogComponent implements OnInit {
  // Responsive: https://stackoverflow.com/a/52989737/11061015
  smallScreen: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewMaillistDialogComponent>,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private mailinglistService: MailinglistsService
  ) {
    breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  setCompletedForm1(): boolean {
    return true;
  }

  getErrorMessageForm1(): string {
    return 'Eingaben fehlen';
  }
  getErrorMessageForm2(): string {
    return 'Eingaben fehlen';
  }
  getErrorMessageForm3(): string {
    return 'Eingaben fehlen';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Submit triggered!');
    console.log(this.firstFormGroup.value);
    this.mailinglistService.createMailinglist(this.createMailinglist());
    this.dialogRef.close();
  }

  createMailinglist(): MailinglistBlueprint {
    // tslint:disable-next-line: prefer-const
    let mailinglist = {
      verteilerName: this.firstFormGroup.value.verteilerName,
      verteilerMail: this.firstFormGroup.value.verteilerMail,

      mailadressen: this.secondFormGroup.value.mailadressen,

      eigentuemer: this.thirdFormGroup.value.eigentuemer,
      privateListe: this.thirdFormGroup.value.privateListe,
      moderierteListe: this.thirdFormGroup.value.moderierteListe,
    } as MailinglistBlueprint;

    return mailinglist;
  }

  debug() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
  }

  ngOnInit() {
    // TODO: Um schneller einen neuen Verteiler anlegen zu können, sind hier bereits Default-Werte hinterlegt. Dient ausschließlich zu Debugzwecken
    this.firstFormGroup = this.formBuilder.group({
      verteilerName: ['Test-Verteiler', Validators.required],
      verteilerMail: ['testverteileradresse@bschott.de', Validators.email],
    });
    this.secondFormGroup = this.formBuilder.group({
      mailadressen: ['test1@bschott.de, test2@bschott.de\ntest3@bschott.de', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      eigentuemer: ['', Validators.required],
      privateListe: [true],
      moderierteListe: [false],
    });

    this.authService
      .getMailOfCurrentUser$()
      .pipe(take(1))
      .subscribe(mail => {
        this.thirdFormGroup.patchValue({ eigentuemer: mail });
      });
  }
}
