import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'accessToken';
  
  constructor() {}
 
  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public decodeToken() {
    const token = this.getToken();

    if(token){
      return jwtDecode(token);
    }

    return null;
  }
}
