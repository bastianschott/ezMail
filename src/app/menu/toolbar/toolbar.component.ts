import { AuthenticationService } from './../../shared/authentication.service';
import { Component, Inject } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
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
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialogComponent {
  faGithub = faGithub;
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-register-dialog',
  templateUrl: 'register-dialog.html',
})
export class RegisterDialogComponent {
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
