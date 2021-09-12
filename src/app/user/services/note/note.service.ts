import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  
  private ROOT_URL = "http://127.0.0.1:3000/api/chat/create";
  private readNoteApi = "http://127.0.0.1:3000/api/note/read";
  private createNoteApi = "http://127.0.0.1:3000/api/note/create";
  constructor(private http: HttpClient) { }


  
    

  deleteNote(chat) {
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(this.ROOT_URL,chat,{headers:header} );
  }
   createNote(chatid,note){
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.createNoteApi}/${chatid}`,note,{headers:header});
  }

  readNote(chatid){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readNoteApi}/${chatid}`,{headers:header});
  }
}
