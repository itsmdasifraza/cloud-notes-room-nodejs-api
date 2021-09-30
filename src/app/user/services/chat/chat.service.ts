import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private ROOT_URL =  `${this.connection}://${this.backendIp}/api/chat/create`;
  private readChatApi =  `${this.connection}://${this.backendIp}/api/chat/read`;
  private readPublicChatApi =  `${this.connection}://${this.backendIp}/api/chat/read/public`;
  private deleteChatApi =  `${this.connection}://${this.backendIp}/api/chat/delete`;


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

  readPublicChat(username){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readPublicChatApi}/${username}`);
  }
  
  readSingleChat(chatid){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readChatApi}/${chatid}`,{headers:header});
  }

  deleteChat(chatid){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.deleteChatApi}/${chatid}`,{headers:header});
  }
}
