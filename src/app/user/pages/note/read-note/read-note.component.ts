import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-read-note',
  templateUrl: './read-note.component.html',
  styleUrls: ['./read-note.component.css']
})
export class ReadNoteComponent implements OnInit {

  index;
  list;
  listItem;
  location = window.location.href;
  constructor(private route: ActivatedRoute, private router: Router, private appService: AppService,private titleService:Title, private meta: Meta) {
   
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.meta.updateTag({ name: 'keywords', content: `chat notes, chatnotes, md asif raza` });
    this.meta.updateTag({ name: 'description', content: `Click to see your private notes` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
    this.meta.updateTag({ property:"og:type", content:"website" });
    
    this.meta.updateTag({ property: "og:description", content: `Click to see your private notes`});
    this.meta.updateTag({ property: "og:image", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png` });
    this.meta.updateTag({ property:"og:image:secure_url", content: `https://www.chatnotes.mdasifraza.com/assets/logo/featured_logo.png`});

   }

  morenotes = new FormGroup({
    points: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });


  ngOnInit(): void {
    this.appService.navtoggle.next(false);
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.params.subscribe(routeParams => {
      console.log(routeParams.chatid);
      this.list = undefined;
      this.listItem = undefined;
      this.index = undefined;
      this.titleService.setTitle(`Loading | Chat Notes`);
      this.meta.updateTag({ property: "og:title", content: `Loading | Chat Notes` });
      this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
      // console.log("list",this.list);
      
      if (this.list) {
        this.list.forEach((element ,index) => {
          if (element.id == routeParams.id) {
            // console.log(element)
            this.listItem= element;
            this.index=index;
            
            this.titleService.setTitle(`${this.list[index].topic} | Chat Notes`);
            this.meta.updateTag({ property: "og:title", content: `${this.list[index].topic} | Chat Notes` });
            
          }
        });
        if (!this.listItem) {
          // this.router.navigate(['/page-not-found']);
        }
      }
      else{
        // this.router.navigate(['/page-not-found']);
      }
    });
  }

  ngOnDestroy() {
    this.appService.navtoggle.next(true);
    // this.router.navigate(["/shownotes/"]);
  }

  moreNotes() {
    
    if (this.morenotes.valid) {

      // console.log("valid");
      // console.log(this.morenotes.value);

      var newData = this.morenotes.value;
      
      this.morenotes.reset();

      var note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if (note) {
        
        note[this.index].message.push(newData);
        localStorage.setItem('myprivatenotes', JSON.stringify(note));
        this.listItem.message.push(newData);
        this.appService.subject.next(note);
      }
      else{
        this.appService.subject.next([]);
        // this.router.navigate(['/shownotes']);
      }
    }
  }


  deleteNotes(){
    // console.log("deletenotes clicked")
    let note = JSON.parse(localStorage.getItem('myprivatenotes'));
    if(note){

        note.splice(this.index,1);
        localStorage.setItem('myprivatenotes', JSON.stringify(note));
        this.appService.subject.next(note);
        this.router.navigate(['/shownotes']);
      }
      else{
        var empty = [];
        this.appService.subject.next(empty);
        // this.router.navigate(['/shownotes']); 
      }


  }

  deletePoints(index){
      // console.log("delete points clicked",index)
     // if(this.listItem){
     // }
      let note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if(note){
        this.listItem.message.splice(index,1);
          note[this.index].message.splice(index,1);
          localStorage.setItem('myprivatenotes', JSON.stringify(note));
          this.appService.subject.next(note);
        }
        
        else{
          this.appService.subject.next([]);
          // this.router.navigate(['/shownotes']);
        }
  }

}
