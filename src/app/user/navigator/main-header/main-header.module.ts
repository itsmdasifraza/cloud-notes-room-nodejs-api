import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { RouterModule } from '@angular/router';
import { ReadChatModule } from '../../pages/chat/read-chat/read-chat.module';



@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReadChatModule
  ],
  exports: [MainHeaderComponent]
})
export class MainHeaderModule { }
