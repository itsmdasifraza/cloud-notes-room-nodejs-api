import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRegLoginService } from '../../services/auth/auth-reg-login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  location = window.location.href;
  constructor(private authService : AuthRegLoginService, private router : Router, private titleService: Title, private meta : Meta) {
    this.titleService.setTitle("Register");
    this.meta.updateTag({ name: 'description', content: `type username, email and password.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
   }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(36)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  ngOnInit(): void {
  }
  success = false;
  error = false;
  spinner : boolean = false;
  
  register(){
    if(this.registerForm.valid){
      this.spinner = true;
      this.error = false;
        // console.log(this.registerForm.value);
        
        let user = {
          "username" : this.registerForm.value.username,
          "email" : this.registerForm.value.email,
          "password" : this.registerForm.value.password
        }
        
        this.authService.register(user).subscribe(
          (res)=>{
            // console.log("res",res);
    
            this.spinner = false;
            this.registerForm.reset();
            this.success  = res.mssg;
            // this.router.navigate(["/login"]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }
}
