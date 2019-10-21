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
  { path: '', component: DashboardComponent },
  { path: '', component: DashboardToolbarComponent, outlet: 'toolbar' },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user',
    component: UserToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'mail-settings',
    component: MailSettingsComponent,
  },
  {
    path: 'mail-settings',
    component: MailSettingsToolbarComponent,
    outlet: 'toolbar',
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings',
    component: SettingsToolbarComponent,
    outlet: 'toolbar',
  },
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
