import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private connectService : ConnectService) { }
  @Input() username;
  ngOnInit(): void {

  }
  home(){
    this.router.navigate(["/"]);
  }
  chat(){
    this.router.navigate(["/chat"]);
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
    this.connectService.chatRefresh.next([]);
    this.connectService.userRefresh.next(null);
    localStorage.removeItem("user-token");
    this.router.navigate(["/"]);
  }
}
