import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './user/guard/authorized/authorized.guard';
import { UnauthorizedGuard } from './user/guard/unauthorized/unauthorized.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./user/pages/main/home/home.module').then(m => m.HomeModule)},
  { path: 'contact', loadChildren: () => import('./user/pages/main/contact/contact.module').then(m => m.ContactModule)},
  { path: 'about', loadChildren: () => import('./user/pages/main/about/about.module').then(m => m.AboutModule)},
  { path: 'policy', loadChildren: () => import('./user/pages/guide/policy/policy.module').then(m => m.PolicyModule)},
  { path: 'chat',
  canActivate: [AuthorizedGuard] , loadChildren: () => import('./user/pages/chat/read-chat/read-chat.module').then(m => m.ReadChatModule)},
  { path: 'register',
  canActivate: [UnauthorizedGuard] , loadChildren: () => import('./user/auth/register/register.module').then(m => m.RegisterModule)},
  // { path: 'register', loadChildren: () => import('./user/auth/register/register.module').then(m => m.RegisterModule)},
  { path: 'login',
  canActivate: [UnauthorizedGuard] , loadChildren: () => import('./user/auth/login/login.module').then(m => m.LoginModule)},
  { path: 'settings' , loadChildren: () => import('./user/pages/user/setting/setting.module').then(m => m.SettingModule)},
 
  { path: ':username' , loadChildren: () => import('./user/pages/user/profile/profile.module').then(m => m.ProfileModule)},
  
  { path: '**', loadChildren: () => import('./user/pages/404/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
