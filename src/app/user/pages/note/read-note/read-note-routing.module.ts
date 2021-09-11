import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadNoteComponent } from './read-note.component';


const routes: Routes = [
  {
    path : '' , 'component' : ReadNoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadNoteRoutingModule { }
