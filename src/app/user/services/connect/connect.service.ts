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

  //this subject toggle setting section on following routes => settings/user-icon , settings/info , settings/password
  settingToggle = new Subject<boolean>();

  userInfo = new BehaviorSubject({});
  constructor() { }
}
