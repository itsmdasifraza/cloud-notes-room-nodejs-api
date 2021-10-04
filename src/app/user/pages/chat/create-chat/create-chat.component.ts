import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {
chatSubscription : Subscription;
chats;
dummy;
owneruser;
ownerusername;
  location = window.location.href;
  constructor(private connectService: ConnectService,private userService: UserService, private chatService : ChatService, private router : Router,private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Create Chat");
    this.meta.updateTag({ name: 'description', content: `Create new chat.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 


   }


  chatForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    privacy: new FormControl('', [Validators.required]),
  });
  
  ngOnInit(): void {
      this.chatForm.setValue({
        title : '',
        description:'',
        privacy : "public"
      });

      this.connectService.chatToggle.next(false);
      this.chatSubscription = this.connectService.chatRefresh.subscribe((res)=>{
        if(res){
          if(res.length > 0){
            this.chats = res;
            // console.log("list2 reteive", this.chats);
          }
        }
      },(err)=>{
        if(err){
          // console.log("err",err);
        }
      });
      this.userService.readUser().subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.owneruser = res.info;
          this.ownerusername = this.owneruser.username;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
  }

  

  error = false;
  spinner : boolean = false;
  
  createChat(){
    if(this.chatForm.valid){
      this.spinner = true;
      this.error = false;
        // console.log(this.chatForm.value);
        let chat = {
          "title" : this.chatForm.value.title,
         "description" : this.chatForm.value.description,
         "privacy" : this.chatForm.value.privacy
        } 
        
        this.chatService.createChat(chat).subscribe(
          (res)=>{
            // console.log("res",res);
            let singleChat = res.info;
            if(this.chats && this.chats.length > 0){

              this.chats.push(singleChat)
            }
            else{
              this.chats = [singleChat];
            }
           this.connectService.chatRefresh.next(this.chats);
            this.spinner = false;
            this.chatForm.reset();
            this.router.navigate([`/chat/${this.ownerusername}/${singleChat._id}/note/view/all`]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }

  ngOnDestroy(): void {
    this.connectService.chatToggle.next(true);
    this.chatSubscription.unsubscribe();
    
}
}
