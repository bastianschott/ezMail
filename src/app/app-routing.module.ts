import { ToolbarComponent } from './menu/toolbar/toolbar.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { DashboardToolbarComponent } from './core/dashboard/dashboard-toolbar/dashboard-toolbar.component';
import { UserComponent } from './core/user/user.component';
import { UserToolbarComponent } from './core/user/user-toolbar/user-toolbar.component';

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
