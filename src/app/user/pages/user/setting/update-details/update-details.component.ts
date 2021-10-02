import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  constructor(private connectService : ConnectService ,private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private profileService: ProfileService) { 
    this.connectService.settingToggle.next(false);
  }
  userData;

  changeProfileForm = this.fb.group({
    name: new FormControl('', []),
    phone: new FormControl('', []),
    address: new FormControl('', []),
    college: new FormControl('', []),
    education: new FormControl('', []),
    about: new FormControl('', []),
  });

  ngOnInit(): void {
 
    this.connectService.userRefresh.subscribe(res => {
      if (res) {
        // console.log("res", res);
        this.userData = res;
        this.changeProfileForm.setValue({
          name: this.userData.name,
          phone: this.userData.phone,
          address: this.userData.address,
          college: this.userData.college,
          education: this.userData.education,
          about: this.userData.about,
        });
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }

  changeProfile() {
    if (this.changeProfileForm.valid) {
      // console.log(this.changeProfileForm.value);
      this.profileService.updatePersonalInfo(this.changeProfileForm.value).subscribe(
        (res) => {
          // console.log("res", res);
          this.connectService.userRefresh.next(res.data);
          this.router.navigate(["/settings"]);

        }, (err) => {
          // console.log("err", err);
        });
    }
  }
  ngOnDestroy(): void {
    this.connectService.settingToggle.next(true);
}

}