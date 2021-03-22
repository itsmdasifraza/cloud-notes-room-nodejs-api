import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PolicyComponent } from './policy/policy.component';
import { AddNotesComponent } from './show-notes/add-notes/add-notes.component';
import { DefaultScreenComponent } from './show-notes/default-screen/default-screen.component';
import { NotesDetailComponent } from './show-notes/notes-detail/notes-detail.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contact', component:ContactComponent},
  {path:'policy', component:PolicyComponent},
  {path:'about', component: AboutComponent},
  {path:'shownotes', component:ShowNotesComponent,
  children:[
    { path:'', component:DefaultScreenComponent},
    { path:'addnotes', component:AddNotesComponent},
    {path: ':id', component:NotesDetailComponent}
  ]},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
