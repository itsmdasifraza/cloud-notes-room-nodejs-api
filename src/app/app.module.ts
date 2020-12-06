import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import { NotesDetailComponent } from './show-notes/notes-detail/notes-detail.component';
import { NotesListComponent } from './show-notes/notes-list/notes-list.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DefaultScreenComponent } from './show-notes/default-screen/default-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddNotesComponent } from './show-notes/add-notes/add-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowNotesComponent,
    NotesListComponent,
    NotesDetailComponent,
    DefaultScreenComponent,
    PageNotFoundComponent,
    AddNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    Ng2SearchPipeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
