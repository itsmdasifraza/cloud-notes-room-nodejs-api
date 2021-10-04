import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Contact");
    this.meta.updateTag({ name: 'description', content: `Md Asif Raza
    Email: itsmdasifraza@gmail.com
    
    If you have any questions, suggestions or other requests feel free to contact me! I am always happy to hear from you!` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  ngOnInit(): void {
  }

}
