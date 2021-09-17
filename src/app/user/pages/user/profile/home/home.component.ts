import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder,private router: Router) { }
  avatar = ["user1", "user4","user5","user2" , "user6", "user7", "user3","user8", "user9"];

  changeAvatarForm = this.fb.group({ 
    user_icon: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {
  }
  changeAvatar(){
    if (this.changeAvatarForm.valid) {
      console.log(this.changeAvatarForm.value);
    }
  }

}
