import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private chatService: ChatService, private profileService: ProfileService) { }
  userData;
  publicChat;
  username;
  owneruser;
  ownerusername ;
  error;

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
      this.userService.readUser().subscribe(res => {
      if (res) {
        // console.log("res",res);
        this.owneruser = res.info;
        this.ownerusername = this.owneruser.username;
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
    this.route.params.subscribe(routeParams => {
      this.error = undefined;
      this.publicChat = undefined;
      this.userData = undefined;
      // console.log(routeParams.username);
      this.profileService.readProfile(routeParams.username).subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.userData = res.data;
          this.username = this.userData.username;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
      this.chatService.readPublicChat(routeParams.username).subscribe(res => {
        if (res) {
          console.log("res", res);
          this.publicChat = res.data;
        }
      }, err => {
        if (err) {
          console.log("err", err);
          this.error = err;
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
    });
  }

  searchUser(){
    if(this.searchForm.valid){
    // console.log(this.searchForm.value);
     this.router.navigate(["/"+ this.searchForm.value.search]);
     this.searchForm.reset();
    }
  }

}
