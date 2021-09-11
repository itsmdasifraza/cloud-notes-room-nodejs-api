import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MainHeaderModule } from '../../navigator/main-header/main-header.module';
import { FooterModule } from '../../navigator/footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MainHeaderModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RegisterModule { }
