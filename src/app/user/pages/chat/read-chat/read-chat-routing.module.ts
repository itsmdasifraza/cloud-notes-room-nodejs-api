import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadChatComponent } from './read-chat.component';


const routes: Routes = [
  {
    path : '' , 'component' : ReadChatComponent,
    children:[
      { path: '', loadChildren: () => import('../chat-screen/chat-screen.module').then(m => m.ChatScreenModule)},
      { path: 'create', loadChildren: () => import('../create-chat/create-chat.module').then(m => m.CreateChatModule)},
      { path: ':username/:chatid/note/view/all', loadChildren: () => import('../../note/read-note/read-note.module').then(m => m.ReadNoteModule)},
      { path: 'edit/:username/:chatid', loadChildren: () => import('../edit-chat/edit-chat.module').then(m => m.EditChatModule)},
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadChatRoutingModule { }
