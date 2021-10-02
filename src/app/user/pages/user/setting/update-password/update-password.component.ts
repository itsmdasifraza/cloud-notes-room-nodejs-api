import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private connectService: ConnectService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private profileService: ProfileService) {
    this.connectService.settingToggle.next(false);
   }
  userData;

  changePasswordForm = this.fb.group({
    newpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(): void {
   
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      // console.log(this.changeProfileForm.value);
      this.profileService.updatePasswordInfo(this.changePasswordForm.value).subscribe(
        (res) => {
          // console.log("res", res);
          this.connectService.chatRefresh.next([]);
          this.connectService.userRefresh.next(null);
          localStorage.removeItem("user-token");
          this.router.navigate(["/"]);

        }, (err) => {
          // console.log("err", err);
        });
    }
  }

  ngOnDestroy(): void {
    this.connectService.settingToggle.next(true);
  }
}
