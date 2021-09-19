import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: Routes = [
  {
    path : '' , 'component' : SettingComponent,
    children:[
      { path: ':username/avatar', 'component' : UpdateAvatarComponent},
      { path: ':username/details', 'component' : UpdateDetailsComponent},
      { path: ':username/password', 'component' : UpdatePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
