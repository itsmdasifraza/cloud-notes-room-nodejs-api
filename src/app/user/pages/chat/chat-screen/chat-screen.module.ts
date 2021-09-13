import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatScreenRoutingModule } from './chat-screen-routing.module';
import { ChatScreenComponent } from './chat-screen.component';


@NgModule({
  declarations: [
    ChatScreenComponent
  ],
  imports: [
    CommonModule,
    ChatScreenRoutingModule
  ]
})
export class ChatScreenModule { }
