import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../interfaces/topic.interface';
import { ApiResponse } from '../../core/interfaces/response/api-response.interface';
import { TopicResponse } from '../interfaces/response/topic-response.interface';
import { ModuleType } from '../enum/module-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  create(topic: Topic, languageId: number){
    return this.http.post<ApiResponse<TopicResponse>>(`api/${languageId}/topics`, topic);
  }

  createSubtopic(languageId:number, topic: Topic, parentId: number){
    return this.http.post<ApiResponse<TopicResponse>>(`api/${languageId}/topics/${parentId}`, topic);
  }

  findOne(languageId: number, id: number, moduleType: ModuleType){
    return this.http.get<ApiResponse<TopicResponse>>(`api/${languageId}/topics/${id}?moduleType=${moduleType}`);
  }

  findAll(languageId: number, moduleType: ModuleType){
    return this.http.get<ApiResponse<TopicResponse[]>>(`api/${languageId}/topics/all?moduleType=${moduleType}`);
  }

  findMany(languageId: number, moduleType: ModuleType, parentId?: number){

    if(parentId){
      return this.http.get<ApiResponse<TopicResponse[]>>(`api/${languageId}/topics?moduleType=${moduleType}&parentId=${parentId}`);
    }

    return this.http.get<ApiResponse<TopicResponse[]>>(`api/${languageId}/topics?moduleType=${moduleType}`);
  }

  update(languageId: number, id: number, topic: {name: string},){
    return this.http.patch<ApiResponse<TopicResponse>>(`api/${languageId}/topics/${id}`, topic);
  }

  delete(languageId:number, id:number){
    return this.http.delete(`api/${languageId}/topics/${id}`);
  }
}
