import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MainHeaderModule,
    FooterModule
  ]
})
export class ContactModule { }
