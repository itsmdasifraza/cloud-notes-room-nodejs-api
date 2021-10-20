import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRegLoginService } from '../../services/auth/auth-reg-login.service';
import { ConnectService } from '../../services/connect/connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  location = window.location.href;
  constructor(private connectService: ConnectService, private authService : AuthRegLoginService, private router : Router, private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle("Login");
    this.meta.updateTag({ name: 'description', content: `type username or email and password.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  loginForm = new FormGroup({
    usermail: new FormControl('', [Validators.required, Validators.minLength(4), this.userVal.bind(this)]),
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
  userVal(control:FormControl) {
    let regUser=/^[a-zA-Z0-9._@]+$/;
    if(!regUser.test(control.value)){
      return { 'usernameSyntaxInvalid': true };
    }
    return null;
  }

}
