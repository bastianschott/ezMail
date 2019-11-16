import { Component, OnInit, Input } from '@angular/core';
import { Mailinglist } from 'src/app/shared/ezmail/mailinglist';
import { MailinglistsService } from 'src/app/shared/ezmail/mailinglists.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss'],
  providers: [DatePipe],
})
export class EditEntryComponent implements OnInit {
  @Input() mailinglist: Mailinglist;
  timeCreated = '';
  timeModified = '';
  mails: string[] = ['Loading...'];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  formGroup: FormGroup;

  // Responsive: https://stackoverflow.com/a/52989737/11061015
  smallScreen: boolean;
  constructor(
    private mailinglistService: MailinglistsService,
    private titleService: Title,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigate([{ outlets: { toolbar: ['edit'] } }]);
    this.titleService.setTitle('Bearbeiten | ezMail');
    const id = this.route.snapshot.paramMap.get('id');

    this.formGroup = this.formBuilder.group({
      verteilerName: ['Loading...', Validators.required],
      verteilerMail: ['Loading...', Validators.email],
      eigentuemer: ['', Validators.email],
      privateListe: [false],
      moderierteListe: [false],
    });

    this.mailinglistService
      .getSingleMailinglist$(id)
      .pipe(take(1))
      .subscribe(list => {
        this.mailinglist = list;
        this.formGroup = this.formBuilder.group({
          verteilerName: [this.mailinglist.verteilerName, Validators.required],
          verteilerMail: [this.mailinglist.verteilerMail, Validators.email],
          eigentuemer: [this.mailinglist.eigentuemer, Validators.email],
          mailadressen: [this.mailinglist.mailadressen],
          privateListe: [this.mailinglist.privateListe],
          moderierteListe: [this.mailinglist.moderierteListe],
        });
        this.timeCreated = this.datePipe.transform(this.mailinglist.timeCreated, 'dd.MM.yyyy HH:mm');
        this.timeModified = this.datePipe.transform(this.mailinglist.timeModified, 'dd.MM.yyyy HH:mm');
        this.mails = this.mailinglist.mailadressen;

        this.titleService.setTitle(this.mailinglist.verteilerName + ' bearbeiten | ezMail');
      });
  }

  abort(): void {
    this.router.navigate([{ outlets: { primary: ['dashboard'], toolbar: ['dashboard'] } }]);
  }

  save(): void {
    this.mailinglist.verteilerName = this.formGroup.value.verteilerName;
    this.mailinglist.verteilerMail = this.formGroup.value.verteilerMail;
    this.mailinglist.eigentuemer = this.formGroup.value.eigentuemer;
    this.mailinglist.mailadressen = this.formGroup.value.mailadressen;
    this.mailinglist.privateListe = this.formGroup.value.privateListe;
    this.mailinglist.moderierteListe = this.formGroup.value.moderierteListe;

    this.mailinglistService.updateMailinglist(this.mailinglist);
    this.router.navigate([{ outlets: { primary: ['dashboard'], toolbar: ['dashboard'] } }]);
  }

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
}
