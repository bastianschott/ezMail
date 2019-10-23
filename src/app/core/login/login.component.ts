import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // https://github.com/RaphaelJenni/FirebaseUI-Angular/blob/master/src/app/main/main.component.ts
  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthenticationService, private titleService: Title) {
    this.titleService.setTitle('Login | ezMail');
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    // console.log('successCallback', data);
    console.log(this.isLoggedIn);
    this.router.navigate([{ outlets: { primary: ['dashboard'], toolbar: ['dashboard'] } }]);
  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }
}
