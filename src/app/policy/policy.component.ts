import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  
  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Policy | Chat Notes");
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    this.meta.updateTag({ property: "og:title", content: `Policy | Chat Notes` });
    this.meta.updateTag({ property: "og:description", content: `The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions.`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

  }

  ngOnInit(): void {
  }

}
