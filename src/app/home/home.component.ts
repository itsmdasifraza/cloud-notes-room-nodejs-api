import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Chat Notes - Post your private notes in chats form, Your notes are secure in local storage.");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `Post your private notes in chats form, Your notes are secure in local storage.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    this.meta.updateTag({ property: "og:title", content: `Chat Notes - Post your private notes in chats form, Your notes are secure in local storage.` });
    this.meta.updateTag({ property: "og:description", content: `Post your private notes in chats form, Your notes are secure in local storage.`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

  }

  ngOnInit(): void {
  }

}
