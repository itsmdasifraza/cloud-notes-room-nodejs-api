import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRegLoginService } from '../../services/auth/auth-reg-login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthRegLoginService, private router : Router) { }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),

  });

  ngOnInit(): void {
  }

  error = false;
  spinner : boolean = false;
  
  register(){
    if(this.registerForm.valid){
      this.spinner = true;
      this.error = false;
        console.log(this.registerForm.value);
        let username = this.registerForm.value.username;
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;
        this.registerForm.reset();
        this.authService.register(this.registerForm.value).subscribe(
          (res)=>{
            console.log(res);
    
            this.spinner = false;
            this.router.navigate(["/login"]);

          },(err)=>{
            console.log(err);
            this.spinner = false;
            this.error = true;
        });
    }
  }
}
