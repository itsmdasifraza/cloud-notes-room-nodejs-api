import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-default-screen',
  templateUrl: './default-screen.component.html',
  styleUrls: ['./default-screen.component.css']
})
export class DefaultScreenComponent implements OnInit {

  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Show Saved Notes | Chat Notes");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `Hurry Up, Insert Your Notes But, Never Clear Browser Local Storage.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    this.meta.updateTag({ property: "og:title", content: `Show saved Notes | Chat Notes` });
    this.meta.updateTag({ property: "og:description", content: `Hurry Up, Insert Your Notes But, Never Clear Browser Local Storage.`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

  }
  ngOnInit(): void {
  }

}
