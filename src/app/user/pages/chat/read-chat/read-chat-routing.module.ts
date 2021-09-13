import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadChatComponent } from './read-chat.component';


const routes: Routes = [
  {
    path : '' , 'component' : ReadChatComponent,
    children:[
      { path: '', loadChildren: () => import('../chat-screen/chat-screen.module').then(m => m.ChatScreenModule)},
      { path: 'create', loadChildren: () => import('../create-chat/create-chat.module').then(m => m.CreateChatModule)},
      { path: ':chatid/note', loadChildren: () => import('../../note/read-note/read-note.module').then(m => m.ReadNoteModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadChatRoutingModule { }
