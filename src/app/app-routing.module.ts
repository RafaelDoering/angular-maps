import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps/maps.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: MapsComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
