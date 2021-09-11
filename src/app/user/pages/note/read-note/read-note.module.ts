import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadNoteRoutingModule } from './read-note-routing.module';
import { ReadNoteComponent } from './read-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReadNoteComponent],
  imports: [
    CommonModule,
    ReadNoteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ReadNoteModule { }
