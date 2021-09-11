import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateChatRoutingModule } from './create-chat-routing.module';
import { CreateChatComponent } from './create-chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateChatComponent],
  imports: [
    CommonModule,
    CreateChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CreateChatModule { }
