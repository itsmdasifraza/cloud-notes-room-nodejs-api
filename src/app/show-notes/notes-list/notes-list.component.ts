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
  private subscription: Subscription;
  private navsub : Subscription;
  list;
  navtoggle = true;
  searchText: string;
  constructor(private appService: AppService, private router: Router) {
    // subscribe to home component messages
    this.subscription=this.appService.subject.subscribe(message => {
      // console.log("reverse subject working");
      if (message) {
        if(message.length > 0){
          this.list = message.slice().reverse();
          // this.list  = message.reverse();
         
        }
        else{
          this.list = [];
        }
        
        //console.log( "updated list",this.list);
      }
      else{
        this.list = [];
      }
    });
    this.navsub =this.appService.navtoggle.subscribe(message => {
      this.navtoggle = message;
      // if (message) {
      //   console.log("nav",message);
      // }
    });
  }

  ngOnInit(): void {

    var data = JSON.parse(localStorage.getItem('myprivatenotes'));
    if(data){
      if(data.length > 0){
        this.list = data.reverse();
        // console.log("reverse init working");
      }
      else{
        this.list = [];
      }
    }
    else{
      this.list = [];
    }
    
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.navsub.unsubscribe();
  }
}
