import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css']
})
export class ShowNotesComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Chat Notes | Manage your notes here");
   }

  ngOnInit(): void {
  }
  parentFunc(data){
    console.log("parent", data)
  }
}
