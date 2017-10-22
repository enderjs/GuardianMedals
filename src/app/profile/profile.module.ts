import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedalsComponent } from './medals/medals.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MedalsComponent, ProfileComponent]
})
export class ProfileModule { }
