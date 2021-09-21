import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  @Input() user;
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  add() {
    this.router.navigate(["/chat/create"]);
  }

}


