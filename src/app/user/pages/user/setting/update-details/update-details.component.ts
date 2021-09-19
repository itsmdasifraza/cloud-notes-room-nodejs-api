import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {


  username;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private profileService: ProfileService) { }
  userData;


  changeProfileForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    college: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      // console.log(routeParams);
      this.username = routeParams.username;
      this.profileService.readProfile(routeParams.username).subscribe(res => {
        if (res) {
          // console.log("res",res);
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


    });
  }


  changeProfile() {
    if (this.changeProfileForm.valid) {

      // console.log(this.changeProfileForm.value);


      this.profileService.updatePersonalInfo(this.username, this.changeProfileForm.value).subscribe(
        (res) => {
          // console.log("res",res);
          this.router.navigate(["/chat"]);

        }, (err) => {
          // console.log("err",err);
        });
    }
  }



}
