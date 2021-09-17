import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
  {path :'' , 'component' : ProfileComponent,
  children:[
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    // { path: ':chatid/note', loadChildren: () => import('../../note/read-note/read-note.module').then(m => m.ReadNoteModule)},
  ]    
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
