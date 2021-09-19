import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() username;
  ngOnInit(): void {

  }
  home(){
    this.router.navigate(["/"]);
  }
  account(){
    // console.log("clicked");
    this.router.navigate(["/"+this.username]);
  }
  settings(){
    // console.log("clicked");
    this.router.navigate(["/settings"]);
  }
  logout(){
    // console.log("clicked");
    localStorage.removeItem("user-token");
    this.router.navigate(["/login"]);
  }
}
