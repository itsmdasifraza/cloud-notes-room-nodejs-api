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

  list;
  listItem;
  newnote;
  listarray=[];
  constructor(private route: ActivatedRoute, private router: Router, private appService: AppService) { }

  morenotes = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });


  ngOnInit(): void {
    this.appService.navtoggle.next(false);
    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.params.subscribe(routeParams => {
      ///////////////////
      this.list = JSON.parse(localStorage.getItem('myprivatenotes'));
      this.listItem = undefined;
      this.listarray=[];
      if (this.list) {
        this.list.forEach(element => {
          if (element.id == routeParams.id) {
            // console.log(element)
            this.listItem= element;
            this.listarray.push(element);
            console.log(this.listarray,"listarray")
          }
        });
        if (this.listItem == undefined) {
          // console.log("und");
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
    // console.log(this.notesForm.value);
    if (this.morenotes.valid) {
      // console.log("valid");
      // console.log(this.morenotes.value);
      var newData = this.morenotes.value;
      newData.id = this.listItem.id;
      console.log(newData);
      this.morenotes.reset();
      var note = JSON.parse(localStorage.getItem('myprivatenotes'));
      if (note) {
        note.push(newData);
        localStorage.setItem('myprivatenotes', JSON.stringify(note));
        this.listarray.push(newData);
      }
    }
  }
}
