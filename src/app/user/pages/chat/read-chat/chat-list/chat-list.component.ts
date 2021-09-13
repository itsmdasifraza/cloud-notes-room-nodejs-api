import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  private chatSubscription: Subscription;
  private toggleSubscription: Subscription;
  list;
  private refreshSubscription : Subscription;
  chatToggle = true;
  searchText: string;
  constructor(private connectService: ConnectService, private chatService: ChatService, private router: Router) {

    this.refreshSubscription = this.connectService.chatRefresh.subscribe(res => {
        if(res){
          if(res.length > 0){

            this.list = res;
          }
        }
    });

    this.toggleSubscription = this.connectService.chatToggle.subscribe(res => {
      this.chatToggle = res;
    });
  }

  ngOnInit(): void {
    // subscribe to home component messages
    this.chatSubscription = this.chatService.readChat().subscribe(res => {
      if (res && res.data.length > 0) {
        // console.log("res",res);
        let list = res.data;
        // console.log("list1 " ,list);
        this.connectService.chatRefresh.next(list);
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }

  navigate(element) {
    this.router.navigate(["/chat/" + element + "/note"]);
  }

  add() {
    this.router.navigate(["/chat/create"]);
  }

  deleteAllNotes() {
  }

  visible() {
    return {
      'dnone': !this.chatToggle,
    }
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
    this.toggleSubscription.unsubscribe();
  }

}
