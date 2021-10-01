import { Component } from '@angular/core';
import { trigger, transition, style, query, group,  animateChild, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { ConnectService } from './user/services/connect/connect.service';
import { UserService } from './user/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('anim', [
      transition('* => *', [
            query(':enter', [style({position:'relative',opacity:'0.2'}), animate('.5s ease-in-out', style({  opacity:'1'}))], {
                optional: true,
            }),   
      ])
    ]) ]
})
export class AppComponent {
  
  constructor(private connectService: ConnectService , private userService : UserService){}
  user;
  ngOnInit(): void {

    this.userService.readUser().subscribe(res => {
      if (res) {
        this.user = res.info;
        // console.log(this.user);
        this.connectService.userRefresh.next(this.user);
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
