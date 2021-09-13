import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  //this subject refresh the chat section whenever a chat is created or deleted.
  chatRefresh = new BehaviorSubject([]);
  //this subject toggle chat section on following routes => chat/create , chat/:chatid
  chatToggle = new Subject<boolean>();
  constructor() { }
}
