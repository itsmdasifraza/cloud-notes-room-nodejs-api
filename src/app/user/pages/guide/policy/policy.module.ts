import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { PolicyComponent } from './policy.component';


@NgModule({
  declarations: [
    PolicyComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    MainHeaderModule,
    FooterModule
  ]
})
export class PolicyModule { }
