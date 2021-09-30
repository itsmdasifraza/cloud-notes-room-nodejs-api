import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;


  private ROOT_URL = `${this.connection}://${this.backendIp}/api/chat/create`;
  private readNoteApi = `${this.connection}://${this.backendIp}/api/note/read`;
  private deleteNoteApi = `${this.connection}://${this.backendIp}/api/note/delete`;
  private createNoteApi = `${this.connection}://${this.backendIp}/api/note/create`;

  constructor(private http: HttpClient) { }


  
    

  deleteNote(chatid,noteid) {
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.deleteNoteApi}/${chatid}/${noteid}`,{headers:header} );
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
