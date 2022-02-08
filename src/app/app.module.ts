import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { FormsModule } from '@angular/forms';
import { MarkerComponent } from './marker/marker.component';
import {config} from './default'
@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    MarkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: config.api,
      libraries: ['places']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
