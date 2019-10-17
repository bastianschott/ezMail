import { UserToolbarComponent } from './user/user-toolbar/user-toolbar.component';
import { UserComponent } from './user/user.component';
import { DashboardToolbarComponent } from './dashboard/dashboard-toolbar/dashboard-toolbar.component';
import { ToolbarComponent } from './menu/toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
