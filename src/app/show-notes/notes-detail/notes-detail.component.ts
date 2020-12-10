import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css']
})
export class NotesDetailComponent implements OnInit {
  index;
  list;
  listItem;
  
  constructor(private route: ActivatedRoute, private router: Router, private appService: AppService) { }

  morenotes = new FormGroup({
    points: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });


  ngOnInit(): void {
    this.appService.navtoggle.next(false);
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.params.subscribe(routeParams => {
      
      
      this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
      this.listItem = undefined;
      this.index = undefined;
      
      if (this.list) {
        this.list.forEach((element ,index) => {
          if (element.id == routeParams.id) {
            // console.log(element)
            this.listItem= element;
            this.index=index;
            
          }
        });
        if (this.listItem == undefined) {
          this.router.navigate(['/shownotes']);
        }
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
      ;
      this.morenotes.reset();

      var note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if (note) {
        
        note[this.index].message.push(newData);
        localStorage.setItem('myprivatenotes', JSON.stringify(note));
        this.listItem.message.push(newData);

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


  }

  deletePoints(index){
      console.log("delete points clicked",index)
      if(this.listItem){
        this.listItem.message.splice(index,1);
      }
      let note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if(note){
          note[this.index].message.splice(index,1);
          localStorage.setItem('myprivatenotes', JSON.stringify(note));
          this.appService.subject.next(note);
        }
  }
}
