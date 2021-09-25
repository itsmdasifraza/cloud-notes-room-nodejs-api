import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PublicChatComponent } from './public-chat/public-chat.component';
import { ReadChatModule } from '../../chat/read-chat/read-chat.module';


@NgModule({
  declarations: [ProfileComponent, PublicChatComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    ReadChatModule
  ]
})
export class ProfileModule { }
