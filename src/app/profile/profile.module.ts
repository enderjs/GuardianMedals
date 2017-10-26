import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { MedalsComponent } from './medals/medals.component';
import { ProfileComponent } from './profile.component';
import { AllmedalsComponent } from './allmedals/allmedals.component';
import { CharactermedalsComponent } from './charactermedals/charactermedals.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [
    ProfileRoutingModule,
    SharedModule,
    CommonModule,
  ],
  declarations: [
    MedalsComponent,
    ProfileComponent,
    AllmedalsComponent,
    CharactermedalsComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
