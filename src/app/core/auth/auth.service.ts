import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Login } from '../interfaces/login.interface';
import { TokenService } from './token.service';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginSuccess } from '../interfaces/login-success.interface';
import { PasswordReset } from '../interfaces/password-reset.interface';
import { VerificationCode } from '../interfaces/verification-code.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, private tokenService: TokenService,
    private jwtHelper: JwtHelperService, private router: Router, 
    //private readonly CONTEXT = {context: new HttpContext().set(IS_PUBLIC, true)}
    ){}

  create(user: User){
    return this.http.post<{data: {token: {token: string}}}>('/api/auth/register', user).pipe(
      tap((data) => {
        this.tokenService.setToken(data.data.token.token);
      })
    );
  }

  login(body: Login) {
    return this.http.post<{ data: {token: string} }>(`/api/auth/login`, body).pipe(
      tap((data) => {
        const loginSuccessData = data.data.token;
        this.tokenService.setToken(loginSuccessData);
      })
    );
  }

  logout(){
    return this.tokenService.removeToken();
  }

  sendResetPasswordEmail(email: {email:string}){
    return this.http.post('api/auth/forgot-password', email);
  }

  resetPassword(password: PasswordReset, token: string){
    return this.http.post(`api/auth/reset-password?token=${token}`, password);
  }

  sendVerificationCode(code: VerificationCode){
    return this.http.post('api/verify-email', code);
  }

  resendVerficationEmail(){}

}