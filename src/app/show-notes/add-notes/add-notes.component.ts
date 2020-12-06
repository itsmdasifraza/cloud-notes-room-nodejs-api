import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  notes:any;
  
  constructor() { }

  notesForm = new FormGroup({
    topic: new FormControl('',[Validators.required,Validators.minLength(1)]),
    subject: new FormControl('',[Validators.required,Validators.minLength(1)]),
  });

  ngOnInit(): void {
      
  }

  pushNotes(){
    // console.log(this.notesForm.value);
    if(this.notesForm.invalid){
      console.log("invalid", this.notesForm);
      
    }
    if(this.notesForm.valid){
      var note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if(!note){
        // console.log("NULL");
        this.notes=[];
      }
      else{
        this.notes = note;
      }
      this.notes.push(this.notesForm.value);
       localStorage.setItem('myprivatenotes',JSON.stringify(this.notes));
      console.log(this.notes);
      this.notesForm.reset();
    }
  }

}
