import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { NoteService } from 'src/app/user/services/note/note.service';
import { Subscription } from 'rxjs';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { userInfo } from 'os';
@Component({
  selector: 'app-read-note',
  templateUrl: './read-note.component.html',
  styleUrls: ['./read-note.component.css']
})
export class ReadNoteComponent implements OnInit {
  subscription : Subscription;
  notes = [];
  months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  chat;
  listItem;
  location = window.location.href;
  constructor(private route: ActivatedRoute,private chatService : ChatService, private noteService : NoteService, private router: Router, private appService: AppService,private titleService:Title, private meta: Meta) {
   
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `Click to see your private notes` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    
    this.meta.updateTag({ property: "og:description", content: `Click to see your private notes`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

   }

  noteForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

chatid;
  ngOnInit(): void {
    this.appService.navtoggle.next(false);
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams.chatid);
      this.chatid = routeParams.chatid; 
      this.notes = undefined;
      this.subscription = this.noteService.readNote(routeParams.chatid).subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.notes = res.data;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
      

      this.subscription = this.chatService.readSingleChat(routeParams.chatid).subscribe(res => {
        if (res) {
          // console.log("res",res);   
          this.chat = res.data;
          this.chat.stamp.month = this.months[this.chat.stamp.month];
          console.log(this.chat);
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
      
    });
  }

  ngOnDestroy() {
    this.appService.navtoggle.next(true);
    this.subscription.unsubscribe();
  }

  createNote() {
    
    if (this.noteForm.valid) {
      let note = {
        "message" : this.noteForm.value.message
      } 
      
      this.noteService.createNote(this.chatid,note).subscribe(
        (res)=>{
          console.log("res",res);
          let info = res.info;
          
          if(!this.notes){
            this.notes = [info];
          }
          else{
            this.notes.push(info);
          }
          this.noteForm.reset();

        },(err)=>{
          // console.log("err",err);
      });
    }
  }


  deleteNote(noteid){
    this.noteService.deleteNote(this.chatid,noteid).subscribe((res)=>{
        if(res){
          // console.log("res",res);
          let info = res.info;
          this.notes.forEach((element , index)=>{
            // console.log(element,index)
            if(element._id == info._id && element.userid == info.userid && element.chatid == info.chatid){
                this.notes.splice(index , 1);
            }
          });
        }
    },(err)=>{
      if(err){
        // console.log("err",err);
      }
    });
  }

  deleteChat(){
    this.chatService.deleteChat(this.chatid).subscribe((res)=>{
      if(res){
        // console.log("res",res);
        this.router.navigate(["/chat"]);
      }
  },(err)=>{
    if(err){
      // console.log("err",err);
    }
  });
}

}