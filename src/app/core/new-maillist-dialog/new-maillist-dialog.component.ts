import { BreakpointObserver } from '@angular/cdk/layout';
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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  mails: string[] = ['test1@example.com', 'test2@example.com'];

  constructor(
    public dialogRef: MatDialogRef<NewMaillistDialogComponent>,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private mailinglistService: MailinglistsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Um schneller einen neuen Verteiler anlegen zu können, sind hier bereits Default-Werte hinterlegt. Dient ausschließlich zu Debugzwecken
    this.firstFormGroup = this.formBuilder.group({
      verteilerName: ['Test-Verteiler', Validators.required],
      verteilerMail: ['testverteileradresse@example.com', Validators.email],
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

  /**
   * Schreibt den String auf das UI, falls Eingaben fehlen oder nciht korrekt sind.
   * @returns String 'Eingaben fehlen'
   */
  getErrorMessage(): string {
    return 'Eingaben fehlen';
  }

  /**
   * Erstellt via MailinglistService die Mailinglist.
   * Zusätzlich wird überprüft ob Mailadressen in dem Array liegen. Falls nicht öffnet
   * sich eine Snackbar mit der Anweisung mindestens eine Mail Adresse anzugeben
   */
  onSubmit(): void {
    if (this.mails.length === 0) {
      this.snackBar.open('Bitte mindestens eine E-mail Adresse angeben!', '', { duration: 2000 });
    } else {
      this.mailinglistService.createMailinglist(this.createMailinglist());
      this.dialogRef.close();
    }
  }

  /**
   * Zieht Daten aus dem Formular und liefert diese zurück.
   * @returns MailinglistTemplate
   */
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

  /**
   * Methode zum Hinzufügen von Elementen in der Chip List
   * @remarks Prüft, ob es sich bei mInput um eine Mail ahndelt. Ist dies nicht der Fall, wird eine Snackbar mit entsprechendem Inhalt erzeugt
   * @param event Material Input Event
   */
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

  /**
   * Methode zum Entfernen von Elementen in der Chip List
   * @param mail Die zu entfernende Mailadresse
   */
  remove(mail: string): void {
    const index = this.mails.indexOf(mail);

    if (index >= 0) {
      this.mails.splice(index, 1);
    }
  }
}
