import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowNotesComponent } from './show-notes/show-notes.component';


const routes: Routes = [
  {path:'', redirectTo:'shownotes', pathMatch:'full'},
  {path:'shownotes', component:ShowNotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
