import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { trigger, transition, style, query, group,  animateChild, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css'],
  animations: [
    trigger('animShow', [
      transition('* => *', [
            query(':enter', [style({position:'relative',opacity:'0.2'}), animate('.5s ease-in-out', style({  opacity:'1'}))], {
                optional: true,
            }),   
      ])
    ]) ]
})
export class ShowNotesComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }
  parentFunc(data){
    // console.log("parent", data)
  }
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
