import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowNotesComponent } from './show-notes.component';


const routes: Routes = [
  // {path : '' , 'component' : ShowNotesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowNotesRoutingModule { }
