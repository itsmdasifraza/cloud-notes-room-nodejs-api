import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  notes: any;
  month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
  location = window.location.href;
  constructor(private appService: AppService, private router : Router,private titleService:Title, private meta: Meta) {
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


  notesForm = new FormGroup({
    topic: new FormControl('', [Validators.required, Validators.minLength(1)]),
    subject: new FormControl('', [Validators.required, Validators.minLength(1)]),

  });

  ngOnInit(): void {
      this.appService.navtoggle.next(false);
  }

  pushNotes() {
    // console.log(this.notesForm.value);
    if (this.notesForm.invalid) {
      // console.log("invalid");
    }

    if (this.notesForm.valid) {
      var note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if (!note) {
        // console.log("NULL");
        this.notes = [];
      }
      else {
        this.notes = note;
      }
      
      let date = new Date();
      
      
      let pushData = {
        "topic" : this.notesForm.value.topic
      };
      pushData["date"] = "Created on "+ date.getDate()+" "+ this.month[date.getMonth()] +", "+date.getFullYear() ;
      pushData["message"] = [];
      pushData["message"].push({"points":this.notesForm.value.subject});
      let random = Math.floor(Math.random() * 3875846868458367) + 464564667 + date.getHours() + date.getMilliseconds() + date.getMinutes() + date.getSeconds();
      pushData["id"] = random.toString();

      
      this.notes.push(pushData);
      localStorage.setItem('myprivatenotes', JSON.stringify(this.notes));
      // console.log(this.notes);
      this.appService.subject.next(this.notes);
      this.notesForm.reset();
      this.router.navigate(["shownotes/"+pushData["id"]]);
    }
  }
  showNotes(){
    this.router.navigate(["/"]);
  }
  ngOnDestroy(): void {
    this.appService.navtoggle.next(true);
    
}
}
