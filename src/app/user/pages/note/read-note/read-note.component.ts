import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { NoteService } from 'src/app/user/services/note/note.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-read-note',
  templateUrl: './read-note.component.html',
  styleUrls: ['./read-note.component.css']
})
export class ReadNoteComponent implements OnInit {
  subscription : Subscription;
  notes;
  location = window.location.href;
  constructor(private route: ActivatedRoute,private noteService : NoteService, private router: Router, private appService: AppService,private titleService:Title, private meta: Meta) {
   
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
      console.log(routeParams.chatid);
      this.chatid = routeParams.chatid; 
      this.notes = undefined;
      this.subscription = this.noteService.readNote(routeParams.chatid).subscribe(res => {
        if (res) {
          console.log("res",res);
          this.notes = res.data;
        }
      }, err => {
        if (err) {
          console.log("err", err);
        }
      });
      
      // console.log("list",this.list);
 
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
          // this.spinner = false;
          this.noteForm.reset();
          // this.router.navigate(["/chat"]);

        },(err)=>{
          console.log("err",err);
          // this.spinner = false;
          // this.error = err.error.mssg;
      });
    }
  }


  deleteNotes(){
  
  }

  deletePoints(index){  
  }

 

}
