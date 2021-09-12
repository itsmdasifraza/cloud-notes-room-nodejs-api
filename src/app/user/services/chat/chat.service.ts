import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ROOT_URL = "http://127.0.0.1:3000/api/chat/create";
  private readChatApi = "http://127.0.0.1:3000/api/chat/read";
  private deleteChatApi = "http://127.0.0.1:3000/api/chat/delete";
  constructor(private http: HttpClient) { }


  
    

  createChat(chat) {
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(this.ROOT_URL,chat,{headers:header} );
  }

  readChat(){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readChatApi}`,{headers:header});
  }

  deleteChat(chatid){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.deleteChatApi}/${chatid}`,{headers:header});
  }
}
