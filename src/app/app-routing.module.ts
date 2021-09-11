import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./user/pages/main/home/home.module').then(m => m.HomeModule)},
  { path: 'contact', loadChildren: () => import('./user/pages/main/contact/contact.module').then(m => m.ContactModule)},
  { path: 'about', loadChildren: () => import('./user/pages/main/about/about.module').then(m => m.AboutModule)},
  { path: 'policy', loadChildren: () => import('./user/pages/guide/policy/policy.module').then(m => m.PolicyModule)},
  { path: 'chats', loadChildren: () => import('./user/pages/chat/show-notes/show-notes.module').then(m => m.ShowNotesModule)},
  { path: '**', loadChildren: () => import('./user/pages/404/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
  // {path:'shownotes', component:ShowNotesComponent,
  // children:[
  //   { path:'', component:DefaultScreenComponent},
  //   { path:'addnotes', component:AddNotesComponent},
  //   {path: ':id', component:NotesDetailComponent}
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
