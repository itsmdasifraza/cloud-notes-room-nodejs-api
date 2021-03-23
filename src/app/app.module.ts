import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import { NotesDetailComponent } from './show-notes/notes-detail/notes-detail.component';
import { NotesListComponent } from './show-notes/notes-list/notes-list.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DefaultScreenComponent } from './show-notes/default-screen/default-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddNotesComponent } from './show-notes/add-notes/add-notes.component';
import { HeaderComponent } from './show-notes/header/header.component';
import { HomeComponent } from './home/home.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { PolicyComponent } from './policy/policy.component';
import { ExplainationComponent } from './home/explaination/explaination.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowNotesComponent,
    NotesListComponent,
    NotesDetailComponent,
    DefaultScreenComponent,
    PageNotFoundComponent,
    AddNotesComponent,
    HeaderComponent,
    HomeComponent,
    MainHeaderComponent,
    FooterComponent,
    ContactComponent,
    PolicyComponent,
    ExplainationComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    Ng2SearchPipeModule ,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
