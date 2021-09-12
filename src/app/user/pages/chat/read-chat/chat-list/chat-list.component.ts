import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/user/services/chat/chat.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  private subscription: Subscription;
  private navsub: Subscription;
  list;
  navtoggle = true;
  searchText: string;
  constructor(private appService: AppService, private chatService: ChatService, private router: Router) {

    // subscribe to home component messages
    this.subscription = this.chatService.readChat().subscribe(res => {
      if (res) {
        // console.log("res",res);
        this.list = res.data.reverse();
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });

    this.navsub = this.appService.navtoggle.subscribe(message => {
      this.navtoggle = message;
    });
  }

  ngOnInit(): void {
  }

  navigate(element) {
    this.router.navigate(["/chat/" + element + "/note"]);
    // alert(element)
  }

  add() {
    this.router.navigate(["/chat/create"]);
  }

  deleteAllNotes() {
  }

  visible() {
    return {
      'dnone': !this.navtoggle,
      // 'btnnight': !this.day
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.navsub.unsubscribe();
  }

}
