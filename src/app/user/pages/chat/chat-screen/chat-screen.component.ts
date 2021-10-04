import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {

  
  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("My Chat");
    this.meta.updateTag({ name: 'description', content: `Your chats will display here.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  ngOnInit(): void {
  }
}
