import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css']
})
export class ShowNotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  parentFunc(data){
    console.log("parent", data)
  }
}
