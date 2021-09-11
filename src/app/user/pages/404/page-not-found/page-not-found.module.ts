import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    MainHeaderModule,
    FooterModule
  ]
})
export class PageNotFoundModule { }
