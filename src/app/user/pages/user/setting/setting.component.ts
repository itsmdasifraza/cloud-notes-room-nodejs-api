import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private userService : UserService , private router : Router) { }
  username;
  user;
  userSubscription : Subscription;
  ngOnInit(): void {
    this.userSubscription = this.userService.readUser().subscribe(res => {
      if (res) {
        // console.log("res",res);
        this.user = res.info;
        this.username = this.user.username;
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }
  add(){
    this.router.navigate(["/chat/create"]);
  }

}
