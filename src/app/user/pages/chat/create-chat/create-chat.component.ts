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
    this.titleService.setTitle("Create New Notes | Chat Notes");
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `Fill your notes in the form below. topic contains heading and notes contain description.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    this.meta.updateTag({ property: "og:title", content: `Create New Notes | Chat Notes` });
    this.meta.updateTag({ property: "og:description", content: `Fill your notes in the form below. topic contains heading and notes contain description.`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});



   }


  chatForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    protected: new FormControl('', [Validators.required]),
  });
  
  ngOnInit(): void {
      this.chatForm.setValue({
        title : '',
        description:'',
        protected : "false"
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
         "protected" : this.chatForm.value.protected
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
