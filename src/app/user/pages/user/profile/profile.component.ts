import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router , private chatService : ChatService, private profileService : ProfileService) { }
  userData;
  publicChat;
  username;
  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams.username);
  this.profileService.readProfile(routeParams.username).subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.userData = res.data;
          this.username  = this.userData.username;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          this.router.navigate(["/error/page-not-found"]);
        }
      });
      this.chatService.readPublicChat(routeParams.username).subscribe(res => {
        if (res) {
          console.log("res",res);
          this.publicChat = res.data;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
    });
  }
  
}
