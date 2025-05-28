import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../interfaces/response/api-response.interface";
import { UserResponse } from "../interfaces/response/user-response.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient){}

    findByEmail(){
        return this.http.get<ApiResponse<UserResponse>>('api/users/user/');
    }
}