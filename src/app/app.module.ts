import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MainHeaderModule } from './user/navigator/main-header/main-header.module';
import { FooterModule } from './user/navigator/footer/footer.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainHeaderModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
