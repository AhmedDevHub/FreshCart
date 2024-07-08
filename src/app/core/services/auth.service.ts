import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) { }
  userInfo: any;
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`
  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signup`, userData)
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signin`, userData)
  }

  forgotPassword(formEmail: object): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `forgotPasswords`,
      formEmail
    );
  }

  resetCode(code: any): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `verifyResetCode`,
      code
    );
  }

  resetPassword(newInfo: object): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `resetPassword`,
      newInfo
    );
  }

  decodeUser(): void {
    const encode = localStorage.getItem('_token')
    if (encode !== null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
    }

  }

}
