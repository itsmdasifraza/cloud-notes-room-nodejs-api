import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Meta, Title} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { AuthRegLoginService } from 'src/app/user/services/auth/auth-reg-login.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // location = window.location.href;
  // constructor(private titleService:Title, private meta: Meta) {
  //   this.titleService.setTitle("Chat Notes | Post your private notes in chats form, Your notes are secure in local storage");
  //   this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  //   this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
  //   this.meta.updateTag({ name: 'description', content: `Post your private notes in chats form, Your notes are secure in local storage.` });
  //   this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  //   this.meta.updateTag({ property:"og:type", content:"website" });
  //   this.meta.updateTag({ property: "og:title", content: `Chat Notes | Post your private notes in chats form, Your notes are secure in local storage` });
  //   this.meta.updateTag({ property: "og:description", content: `Post your private notes in chats form, Your notes are secure in local storage.`});
  //   this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
  //   this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

  // }
  constructor(private connectService: ConnectService, private authService : AuthRegLoginService, private router : Router) { }

  loginForm = new FormGroup({
    usermail: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(36)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  ngOnInit(): void {
  }

  error = false;
  spinner : boolean = false;
  
  login(){
    if(this.loginForm.valid){
      this.spinner = true;
      this.error = false;
        // console.log(this.loginForm.value);
        let user = {
          "usermail" : this.loginForm.value.usermail,
         "password" : this.loginForm.value.password
        } 
        
        this.authService.login(user).subscribe(
          (res)=>{
            // console.log("res",res);
            localStorage.setItem("user-token",res.token);
            this.connectService.userRefresh.next(res.data);
            this.spinner = false;
            this.loginForm.reset();
            this.router.navigate(["/chat"]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }
  

}
