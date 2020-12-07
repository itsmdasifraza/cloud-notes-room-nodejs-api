import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  list;
  searchText:string;
      constructor(private appService: AppService) {
         // subscribe to home component messages
          this.appService.subject.subscribe(message => {
          if (message) {
            this.list = message;
          } 
        });
       }
  
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
