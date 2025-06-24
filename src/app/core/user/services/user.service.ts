import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../interfaces/response/api-response.interface";
import { UserResponse } from "../../interfaces/response/user-response.interface";
import { UserEdit } from "../../interfaces/user-edit.interface";
import { PasswordEdit } from "../../interfaces/password-edit.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  findByEmail() {
    return this.http.get<ApiResponse<UserResponse>>('api/users/user');
  }

  update(user: UserEdit) {
    return this.http.patch<ApiResponse<UserResponse>>(`api/users/update`, user);
  }

  updatePassword(password: PasswordEdit){
    return this.http.put('api/users/update-password', password);
  }

  delete() {
    return this.http.delete('api/users/delete');
  }

}