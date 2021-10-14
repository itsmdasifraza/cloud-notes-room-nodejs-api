import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private forgotPasswordApi = `${this.connection}://${this.backendIp}/api/forgot/password`;

  constructor(private http: HttpClient) { }
  forgot(email) {
    return this.http.post<any>(`${this.forgotPasswordApi}`,email);
  }
}
