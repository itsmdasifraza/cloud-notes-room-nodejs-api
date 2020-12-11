import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  list;
  navtoggle = true;
  searchText: string;
  constructor(private appService: AppService, private router: Router) {
    // subscribe to home component messages
    this.appService.subject.subscribe(message => {
      if (message) {
        this.list = message;

        //console.log( "updated list",this.list);
      }
    });
    this.appService.navtoggle.subscribe(message => {
      this.navtoggle = message;
      // if (message) {
      //   console.log("nav",message);
      // }
    });
  }

  ngOnInit(): void {

    this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
    
  }
  // ngOnChange(): void {
  //   this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
  // }
  navigate(element){
    this.router.navigate(["shownotes/"+element]);
    // alert(element)
  }
  add(){
    this.router.navigate(["shownotes/addnotes"]);
  }
  deleteAllNotes(){
    let res = confirm("Do you really want to delete all your notes ?");
    if(res){
        localStorage.removeItem("myprivatenotes");
        this.router.navigate(["/shownotes"]);
        this.list=[];
    }
  }

  visible() {
    return {
      'dnone': !this.navtoggle,
      // 'btnnight': !this.day
    }
  }
}
