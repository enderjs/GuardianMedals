import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { HomeModule } from "./home/home.module";
import { ProfileModule } from "./profile/profile.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ProfileModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
