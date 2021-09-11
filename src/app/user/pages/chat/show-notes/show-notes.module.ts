import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowNotesRoutingModule } from './show-notes-routing.module';
import { ShowNotesComponent } from './show-notes.component';


@NgModule({
  declarations: [
    ShowNotesComponent
  ],
  imports: [
    CommonModule,
    ShowNotesRoutingModule
  ]
})
export class ShowNotesModule { }
