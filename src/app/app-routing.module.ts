import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { LoginToolbarComponent } from './core/login/login-toolbar/login-toolbar.component';
import { ToolbarComponent } from './menu/toolbar/toolbar.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { DashboardToolbarComponent } from './core/dashboard/dashboard-toolbar/dashboard-toolbar.component';
import { UserComponent } from './core/user/user.component';
import { UserToolbarComponent } from './core/user/user-toolbar/user-toolbar.component';
import { MailSettingsComponent } from './core/mail-settings/mail-settings.component';
import { MailSettingsToolbarComponent } from './core/mail-settings/mail-settings-toolbar/mail-settings-toolbar.component';
import { SettingsComponent } from './core/settings/settings.component';
import { SettingsToolbarComponent } from './core/settings/settings-toolbar/settings-toolbar.component';

const routes: Routes = [
  // initiale Routen
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardToolbarComponent,
    canActivate: [AuthGuard],
    outlet: 'toolbar',
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'mail-settings',
    canActivate: [AuthGuard],
    component: MailSettingsComponent,
  },
  {
    path: 'mail-settings',
    canActivate: [AuthGuard],
    component: MailSettingsToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent,
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginToolbarComponent,
    outlet: 'toolbar',
  },
  { path: '404', component: NotFoundComponent }, // 404
  { path: '**', redirectTo: '404' }, // Added
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
