import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateChatComponent } from './create-chat.component';


const routes: Routes = [
  {
    path : '' , 'component' : CreateChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateChatRoutingModule { }
