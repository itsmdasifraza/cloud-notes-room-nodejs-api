import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private readProfileApi = `${this.connection}://${this.backendIp}/api/profile/read`;
  private readOwnerProfileApi = `${this.connection}://${this.backendIp}/api/profile/read/info/owner`;
  private updateAvatarApi = `${this.connection}://${this.backendIp}/api/profile/update/info/avatar`;
  private updatePersonalApi = `${this.connection}://${this.backendIp}/api/profile/update/info/personal`;
 
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
