import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {

  
  username;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router , private profileService : ProfileService) { }
  avatar = ["user0","user1", "user4","user5","user2" , "user6", "user7", "user3","user8", "user9"];
  userData;
  changeAvatarForm = this.fb.group({ 
    user_icon: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      console.log(routeParams);
      this.username = routeParams.username;
  this.profileService.readProfile(routeParams.username).subscribe(res => {
        if (res) {
          console.log("res",res);
          this.userData = res.data;
          this.changeAvatarForm.setValue({
            user_icon : this.userData.avatar
          });
        }
      }, err => {
        if (err) {
          console.log("err", err);
        }
      });
    });
  }
  changeAvatar(){
    if(this.changeAvatarForm.valid){

        // console.log(this.changeAvatarForm.value);
        let avatar = {
          "avatar" : this.changeAvatarForm.value.user_icon
        } 
        
        this.profileService.updateProfileAvatar(this.username,avatar).subscribe(
          (res)=>{
            // console.log("res",res);
            this.router.navigate(["/chat"]);

          },(err)=>{
            // console.log("err",err);
        });
    }
  }
}
