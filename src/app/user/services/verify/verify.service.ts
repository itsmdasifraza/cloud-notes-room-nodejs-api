import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private verifyEmailApi = `${this.connection}://${this.backendIp}/api/verify/email`;

  constructor(private http: HttpClient) { }
  verifyEmail(token) {
    if (token) {
      let header = new HttpHeaders({
        "token": token
      });
      return this.http.get<any>(`${this.verifyEmailApi}`, { headers: header });
    }
  }

}
