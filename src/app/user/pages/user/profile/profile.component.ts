import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router , private profileService : ProfileService) { }
  userData;
  
  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams.username);
  this.profileService.readProfile(routeParams.username).subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.userData = res.data;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
    });
  }
  
}
