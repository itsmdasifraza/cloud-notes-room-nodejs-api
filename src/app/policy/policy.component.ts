import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Chat Notes | Policy");
   }

  ngOnInit(): void {
  }

}
