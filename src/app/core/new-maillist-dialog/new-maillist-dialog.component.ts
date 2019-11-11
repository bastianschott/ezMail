import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MailinglistTemplate } from 'src/app/shared/ezmail/mailinglist';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  // Test für Chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  mails: string[] = ['test1@bschott.de'];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add mail
    const re = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );

    if (re.test(value)) {
      if ((value || '').trim()) {
        this.mails.push(value.trim());
      }
    } else if (value !== '') {
      this.snackBar.open('Bitte eine valide Mailadresse eingeben', '', { duration: 2000 });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(mail: string): void {
    const index = this.mails.indexOf(mail);

    if (index >= 0) {
      this.mails.splice(index, 1);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<NewMaillistDialogComponent>,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private mailinglistService: MailinglistsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.smallScreen = result.matches;
    });

    // TODO: Um schneller einen neuen Verteiler anlegen zu können, sind hier bereits Default-Werte hinterlegt. Dient ausschließlich zu Debugzwecken
    this.firstFormGroup = this.formBuilder.group({
      verteilerName: ['Test-Verteiler', Validators.required],
      verteilerMail: ['testverteileradresse@bschott.de', Validators.email],
    });

    this.secondFormGroup = this.formBuilder.group({
      mailadressen: [this.mails],
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
