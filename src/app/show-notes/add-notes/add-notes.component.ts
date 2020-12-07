import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  notes:any;
  
  constructor(private appService : AppService) { }

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
      let pushData = this.notesForm.value;
      let date = new Date();
      pushData.date = date;
      let random =   Math.floor(Math.random() * 3875846868458367)+464564667 + date.getHours() + date.getMilliseconds() + date.getMinutes() + date.getSeconds();
      pushData.id = random.toString();
      this.notes.push(pushData);
       localStorage.setItem('myprivatenotes',JSON.stringify(this.notes));
      console.log(this.notes);
      this.appService.subject.next(this.notes);
      this.notesForm.reset();
    }
  }

}
