import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor() { }
  list;
  searchText;
  // list = [
  //   {
  //     topic : 'los angels journey',
  //     subject : 'los angels is a very beautiful city'
  //   },
  //   {
  //     topic : 'los angels journey',
  //     subject : 'los angels is a very beautiful city'
  //   }
  // ];
  ngOnInit(): void {
    // localStorage.setItem('myprivatenotes',JSON.stringify(this.list));
    this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
  }

}
