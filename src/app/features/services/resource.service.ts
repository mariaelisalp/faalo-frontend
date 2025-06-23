import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resource } from "../interfaces/resource.interface";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { ResourceResponse } from "../interfaces/response/resource-response.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService{
    constructor(private http: HttpClient){}

    create(resource: FormData, languageId: number){

        return this.http.post(`api/${languageId}/resources`, resource);
    }

    createByTopic(resource: FormData, languageId: number, topicId: number){
        
        return this.http.post(`api/${languageId}/resources/${topicId}`, resource);
    }

    findOne(id: number, languageId: number){
        return this.http.get<ApiResponse<ResourceResponse>>(`api/${languageId}/resources/${id}`);
    }

    findFile(languageId: number, id:number): Observable<Blob>{
        return this.http.get(`api/${languageId}/resources/file/${id}`, { responseType: 'blob' });
    }

    findAll(languageId: number){
        return this.http.get<ApiResponse<ResourceResponse[]>>(`api/${languageId}/resources/all`);
    }

    findMany(languageId: number, topicId?: number){
        if(topicId){
            return this.http.get<ApiResponse<ResourceResponse[]>>(`api/${languageId}/resources?topicId=${topicId}`);
        }

        return this.http.get<ApiResponse<ResourceResponse[]>>(`api/${languageId}/resources`);
    }

    update(resource:FormData, id: number, languageId: number, topicId?: number){
        return this.http.patch(`api/${languageId}/resources/${id}?topicId=${topicId}`, resource)
    }

    updateTopic(languageId: number, id:number, topic: {id: number | null}){
        return this.http.put(`api/${languageId}/resources/${id}`, topic);
    }

    delete(id: number, languageId: number){
        return this.http.delete(`api/${languageId}/resources/${id}`);
    }
}