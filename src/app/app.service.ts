import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  chatSubject = new Subject<any>();
  navtoggle = new Subject<boolean>();
  constructor() { }
}
