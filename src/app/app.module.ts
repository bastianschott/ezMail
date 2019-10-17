import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthenticationService } from './shared/authentication.service'; // Auth service

// Material components
import { MaterialModule } from './material/material.module';

// Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { ToolbarComponent } from './menu/toolbar/toolbar.component';
import { DashboardToolbarComponent } from './dashboard/dashboard-toolbar/dashboard-toolbar.component';
import { UserComponent } from './user/user.component';
import { UserToolbarComponent } from './user/user-toolbar/user-toolbar.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    ToolbarComponent,
    DashboardToolbarComponent,
    UserComponent,
    UserToolbarComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FontAwesomeModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
