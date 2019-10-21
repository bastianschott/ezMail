import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
})
export class AppModule {}
