import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthRegLoginService {

  registerApi = "http://10.12.1.9:3000/api/auth/register";
  loginApi = "http://10.12.1.9:3000/api/auth/login";
  constructor(private http : HttpClient) { }

  register(user){
    return this.http.post<any>(`${this.registerApi}`,user);
  }

  login(user){
    return this.http.post<any>(`${this.loginApi}`,user);
  }
}
