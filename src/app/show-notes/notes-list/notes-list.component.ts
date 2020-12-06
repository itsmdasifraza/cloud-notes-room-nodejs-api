import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor() { }
  list;
  searchText:string;
  
  ngOnInit(): void {
   
    this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
    // setInterval(()=>{
    //   this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
    // },1000);
  }
  ngOnChange(): void{
    this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
  }
}
