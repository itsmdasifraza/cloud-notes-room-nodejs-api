import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditChatRoutingModule } from './edit-chat-routing.module';
import { EditChatComponent } from './edit-chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditChatComponent],
  imports: [
    CommonModule,
    EditChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EditChatModule { }
