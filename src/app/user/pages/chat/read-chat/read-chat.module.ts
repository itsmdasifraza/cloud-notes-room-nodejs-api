import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadChatRoutingModule } from './read-chat-routing.module';
import { ReadChatComponent } from './read-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './chat-list/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ReadChatComponent, ChatListComponent , HeaderComponent],
  imports: [
    CommonModule,
    ReadChatRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    Ng2SearchPipeModule ,
    RouterModule
  ]
})
export class ReadChatModule { }
