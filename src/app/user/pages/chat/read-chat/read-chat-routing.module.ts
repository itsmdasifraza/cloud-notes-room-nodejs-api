import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadChatComponent } from './read-chat.component';


const routes: Routes = [
  {
    path : '' , 'component' : ReadChatComponent,
    children:[
      // { path:'', component:DefaultScreenComponent},
      { path: 'create', loadChildren: () => import('../create-chat/create-chat.module').then(m => m.CreateChatModule)},
      // {path: ':id', component:NotesDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadChatRoutingModule { }
