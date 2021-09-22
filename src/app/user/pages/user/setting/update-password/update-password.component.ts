import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private profileService: ProfileService) { }
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
    this.profileService.readOwnerProfile().subscribe(res => {
      if (res) {
        // console.log("res", res);
        this.userData = res.data;
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
          this.router.navigate(["/chat"]);

        }, (err) => {
          // console.log("err", err);
        });
    }
  }


}
