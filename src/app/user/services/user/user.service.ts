import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readUserApi = "http://127.0.0.1:3000/api/user/read";
 
  constructor(private http: HttpClient) { }

   readUser(){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readUserApi}`,{headers:header});
  }
 
  
}
