import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from './../../shared/authentication.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  email: string;
  password: string;

  constructor(public dialog: MatDialog, private authService: AuthenticationService) {}

  openLogin(): void {
    console.log(this.authService.getUserIsLoggedIn$());
  }

  openRegister(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '250px',
    });
  }
}

@Component({
  selector: 'app-register-dialog',
  templateUrl: 'register-dialog.html',
})
export class RegisterDialogComponent {
  smallScreen: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  form1Submit(formValues: any): void {
    console.log(formValues);
  }
}
