import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Example } from "../interfaces/example.interface";
import { ModuleType } from "../enum/module-type.enum";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { ExampleResponse } from "../interfaces/response/example-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ExampleService{

    constructor(private http: HttpClient){}

    create(example: Example, moduleId: number){
      return this.http.post<ApiResponse<ExampleResponse>>(`api/${moduleId}/example`, example)
    }

    findOne(id: number, moduleId: number){
      return this.http.get<ApiResponse<ExampleResponse>>(`api/${moduleId}/example/${id}`);
    }

    findMany(moduleType: ModuleType, moduleId: number){
      return this.http.get<ApiResponse<ExampleResponse[]>>(`api/${moduleId}/example?moduleType=${moduleType}`)
    }

    update(example: Example, id: number, moduleId: number){
      return this.http.patch(`api/${moduleId}/example/${id}`, example);
    }

    delete(id: number, moduleId: number){
      return this.http.delete(`api/${moduleId}/example/${id}`);
    }
}