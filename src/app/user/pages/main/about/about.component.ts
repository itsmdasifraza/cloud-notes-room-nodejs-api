import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("About");
    this.meta.updateTag({ name: 'description', content: `Tech stack,
    MongoDB | Express | Angular | NodeJS
    
    User password encryption,
    Bcrypt | Hash | Salt
    
    Validation,
    Express validator | Angular validator
    
    Database connectivity,
    Mongoose
    
    Programming languages,
    Typescript | Javascript
    
    Styling component,
    Bootstrap
    
    Animations,
    Animate.css | Angular animation
    
    Developer,
    Md Asif Raza | Software Developer
    itsmdasifraza@gmail.com.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }
  ngOnInit(): void {
  }

}
