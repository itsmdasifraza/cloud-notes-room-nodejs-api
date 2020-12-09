import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css']
})
export class NotesDetailComponent implements OnInit {
list;
listItem;
  constructor( private route : ActivatedRoute,private router : Router, private appService : AppService) { }

  ngOnInit(): void {
    this.appService.navtoggle.next(false);
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
   });	
    this.route.params.subscribe(routeParams => {
      ///////////////////
      this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
      if(this.list){
        this.list.forEach(element => {
          if(element.id==routeParams.id){
            // console.log(element)
            this.listItem = element;
          }
        });
        if(this.listItem == undefined){
          // console.log("und");
          this.router.navigate(['/shownotes']);
        }
      }
    });
  }
  ngOnDestroy(){
    this.appService.navtoggle.next(true);
    // this.router.navigate(["/shownotes/"]);
  }

}
