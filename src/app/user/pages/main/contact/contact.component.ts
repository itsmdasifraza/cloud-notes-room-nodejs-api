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
    this.titleService.setTitle("Contact | Chat Notes");
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `If you have any questions, suggestions or other requests feel free to contact us! We are always happy to hear from you!` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    this.meta.updateTag({ property: "og:title", content: `Contact | Chat Notes` });
    this.meta.updateTag({ property: "og:description", content: `If you have any questions, suggestions or other requests feel free to contact us! We are always happy to hear from you!`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

  }

  ngOnInit(): void {
  }

}
