import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { AboutComponent } from './about.component';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MainHeaderModule,
    FooterModule
  ]
})
export class AboutModule { }
