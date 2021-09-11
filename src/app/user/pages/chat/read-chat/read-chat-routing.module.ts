import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadChatComponent } from './read-chat.component';


const routes: Routes = [
  {
    path : '' , 'component' : ReadChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadChatRoutingModule { }
