import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css']
})
export class NotesDetailComponent implements OnInit {
list;
listItem;
  constructor( private route : ActivatedRoute) { }

  ngOnInit(): void {

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
      }
    });
  }

}
