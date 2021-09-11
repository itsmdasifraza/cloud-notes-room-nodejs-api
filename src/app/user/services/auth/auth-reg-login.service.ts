import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthRegLoginService {

  registerApi = "http://127.0.0.1:3000/api/account/register";
  constructor(private http : HttpClient) { }

  register(user){
    return this.http.post<any>(`${this.registerApi}`,user);
  }
}
