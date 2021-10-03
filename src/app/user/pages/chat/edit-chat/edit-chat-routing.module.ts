import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditChatComponent } from './edit-chat.component';


const routes: Routes = [
  { path: '' , 'component' : EditChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditChatRoutingModule { }
