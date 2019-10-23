import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import * as Hammer from 'hammerjs';

// Firebase
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Material components
import { MaterialModule } from './material/material.module';

// Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { ToolbarComponent, LoginDialogComponent, RegisterDialogComponent } from './menu/toolbar/toolbar.component';
import { MailSettingsComponent } from './core/mail-settings/mail-settings.component';
import { DashboardToolbarComponent } from './core/dashboard/dashboard-toolbar/dashboard-toolbar.component';
import { UserComponent } from './core/user/user.component';
import { UserToolbarComponent } from './core/user/user-toolbar/user-toolbar.component';
import { MailSettingsToolbarComponent } from './core/mail-settings/mail-settings-toolbar/mail-settings-toolbar.component';
import { SettingsComponent } from './core/settings/settings.component';
import { SettingsToolbarComponent } from './core/settings/settings-toolbar/settings-toolbar.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './core/login/login.component';
import { LoginToolbarComponent } from './core/login/login-toolbar/login-toolbar.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { NotFoundToolbarComponent } from './core/not-found/not-found-toolbar/not-found-toolbar.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  // tosUrl: '<your-tos-link>',
  // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
};

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    ToolbarComponent,
    DashboardToolbarComponent,
    UserComponent,
    UserToolbarComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    MailSettingsComponent,
    MailSettingsToolbarComponent,
    SettingsComponent,
    SettingsToolbarComponent,
    LoginComponent,
    LoginToolbarComponent,
    NotFoundComponent,
    NotFoundToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [
    AngularFirestore,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
})
export class AppModule {}
