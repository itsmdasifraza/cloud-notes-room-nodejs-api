import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddNotesComponent } from './show-notes/add-notes/add-notes.component';
import { DefaultScreenComponent } from './show-notes/default-screen/default-screen.component';
import { NotesDetailComponent } from './show-notes/notes-detail/notes-detail.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shownotes', component:ShowNotesComponent,
  children:[
    { path:'', component:DefaultScreenComponent},
    { path:'addnotes', component:AddNotesComponent},
    {path: ':id', component:NotesDetailComponent}
  ]},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
