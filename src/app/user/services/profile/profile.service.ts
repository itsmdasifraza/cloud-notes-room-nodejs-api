import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  private readProfileApi = "http://127.0.0.1:3000/api/profile/read";
  private updateAvatarApi = "http://127.0.0.1:3000/api/profile/update/avatar";
  private updatePersonalApi = "http://127.0.0.1:3000/api/profile/update/personal";
 
  constructor(private http: HttpClient) { }

   readProfile(username){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readProfileApi}/${username}`,{headers:header});
  }
  updateProfileAvatar(username , data){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.updateAvatarApi}/${username}`,data,{headers:header});
  }

  updatePersonalInfo(username , data){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.updatePersonalApi}/${username}`,data,{headers:header});
  }
  
}
