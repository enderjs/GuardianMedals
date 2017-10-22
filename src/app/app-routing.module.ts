import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './home/dashboard/dashboard.component';




const appRoutes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
//   { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    // Uses old style routing for older browsers eg... http://localhost/#/Home
    // RouterModule.forRoot(appRoutes, { useHash: true });
    // TODO: Disable tracing for production
    // RouterModule.forRoot(appRoutes, {enableTracing: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class AppRoutingModule { }