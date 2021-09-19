import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingComponent, UpdateAvatarComponent, UpdateDetailsComponent, UpdatePasswordComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
  ]
})
export class SettingModule { }
