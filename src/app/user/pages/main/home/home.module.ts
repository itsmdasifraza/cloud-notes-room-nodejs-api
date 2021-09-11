import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { ExplainationComponent } from './explaination/explaination.component';


@NgModule({
  declarations: [
    HomeComponent,
    ExplainationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainHeaderModule,
    FooterModule,
  ]
})
export class HomeModule { }
