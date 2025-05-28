import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Content } from "../interfaces/content.interface";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { ContentResponse } from "../interfaces/response/content-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

    constructor(private http: HttpClient){}

    create(content: Content, languageId: number){
        return this.http.post<ApiResponse<ContentResponse>>(`api/${languageId}/content`, content);
    }

    createByTopic(content: Content, languageId: number, topicId: number){
        return this.http.post<ApiResponse<ContentResponse>>(`api/${languageId}/content/${topicId}`, content);
    }

    findMany(languageId: number, topicId?: number){

        if(topicId){
            return this.http.get<ApiResponse<ContentResponse[]>>(`api/${languageId}/content?topicId=${topicId}`);
        }

        return this.http.get<ApiResponse<ContentResponse[]>>(`api/${languageId}/content`);
    }

    findOne(languageId:number, id: number){
        return this.http.get<ApiResponse<ContentResponse>>(`api/${languageId}/content/${id}`);
    }

    update(content: Content, id: number, languageId: number, topicId: number){

        if(topicId){
            return this.http.patch<ApiResponse<ContentResponse>>(`api/${languageId}/content/${id}?topicId=${topicId}`, content);
        }
        return this.http.patch<ApiResponse<ContentResponse>>(`api/${languageId}/content/${id}`, content);
    }

    delete(id: number, languageId: number){
        return this.http.delete(`api/${languageId}/content/${id}`);
    }

}