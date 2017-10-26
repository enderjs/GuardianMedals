import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './data/http-service';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    HttpService
  ]
})
export class CoreModule { }
