import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user/user.service';
import { VerifyService } from 'src/app/user/services/verify/verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  location = window.location.href;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private verifyService: VerifyService, private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle("Verify Email");
    this.meta.updateTag({ name: 'description', content: `Verifying email.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  successMessage;
  errorMessage;
  spinner = true;
  ngOnInit(): void {
  
    this.route.params.subscribe(routeParams => {
      this.verifyService.verifyEmail(routeParams.token).subscribe(res => {
        if (res) {
          console.log("res",res);
          this.successMessage = res.mssg;
          this.spinner = false;
        }
      }, err => {
        if (err) {
          console.log("err", err);
          this.errorMessage = err.error.mssg;
          this.spinner = false;
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
    });
  }

}
