import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  home(){
    this.router.navigate(["/"]);
  }
  logout(){
    console.log("clicked");
    localStorage.removeItem("user-token");
    this.router.navigate(["/login"]);
  }
}
