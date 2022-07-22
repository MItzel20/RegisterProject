import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MainService {
  static ENDPOINT_POST_REGISTER = "/api/signUp";
  static ENDPOINT_POST_PHONE = "/api/phoneNumber";
  static ENDPOINT_POST_PHONE_VERIFY = "/api/phoneNumber/verify";
  static ENDPOINT_POST_PROFILE_NAME = "/api/profile/name";
  static ENDPOINT_GET_PROFILE = "/api/profile";
    

  constructor(private http: HttpClient) {}

  registerMail(data: any): Observable<any> {
    return this.http
      .post<any>(MainService.ENDPOINT_POST_REGISTER, data)
      .pipe();
  }
  sendPhone(data: any): Observable<any> {
    let phone = {number:data};
    return this.http
      .post<any>(MainService.ENDPOINT_POST_PHONE, phone)
      .pipe();
  }
  validateCode(data: any): Observable<any> {
    let dataT = {token:data};
    return this.http
      .post<any>(MainService.ENDPOINT_POST_PHONE_VERIFY, dataT)
      .pipe();
  }
  sendNames(data: any): Observable<any> {    
    return this.http
      .post<any>(MainService.ENDPOINT_POST_PROFILE_NAME, data)
      .pipe();
  }
  getProfile(): Observable<any> {    
    return this.http
      .get<any>(MainService.ENDPOINT_GET_PROFILE)
      .pipe();
  }
}
