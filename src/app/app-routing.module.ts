import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GoogleMapsComponent} from './google-maps/google-maps.component'
import { MarkerComponent } from './marker/marker.component';

const routes: Routes = [
  {path:'map', component: GoogleMapsComponent},
  {path : 'home', component:MarkerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
