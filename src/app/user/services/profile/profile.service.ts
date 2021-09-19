import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  private readProfileApi = "http://127.0.0.1:3000/api/profile/read";
  private readOwnerProfileApi = "http://127.0.0.1:3000/api/profile/read/info/owner";
  private updateAvatarApi = "http://127.0.0.1:3000/api/profile/update/info/avatar";
  private updatePersonalApi = "http://127.0.0.1:3000/api/profile/update/info/personal";
 
  constructor(private http: HttpClient) { }

   readProfile(username){
    let header= new HttpHeaders({
      "token":
      // localStorage.getItem("user-token")
      "invalid"
    });
    return this.http.get<any>(`${this.readProfileApi}/${username}`,{headers:header});
  }
  readOwnerProfile(){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readOwnerProfileApi}`,{headers:header});
  }
  updateProfileAvatar(data){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.updateAvatarApi}`,data,{headers:header});
  }

  updatePersonalInfo(data){
    let header= new HttpHeaders({
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.updatePersonalApi}`,data,{headers:header});
  }
  
}
