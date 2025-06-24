import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Vocabulary } from "../interfaces/vocabulary.interface";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { VocabularyResponse } from "../interfaces/response/vocabulary-response";

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

    constructor(private http: HttpClient){}

    create(vocabulary: Vocabulary, languageId: number){
        return this.http.post<ApiResponse<VocabularyResponse>>(`api/${languageId}/vocabulary`, vocabulary);
    }

    createByTopic(vocabulary: Vocabulary, languageId: number, topicId: number){
        return this.http.post(`api/${languageId}/vocabulary/${topicId}`, vocabulary);
    }

    findMany(languageId: number, topicId?: number){
        if(topicId){
            return this.http.get<ApiResponse<VocabularyResponse[]>>(`api/${languageId}/vocabulary?topicId=${topicId}`);
        }

        return this.http.get<ApiResponse<VocabularyResponse[]>>(`api/${languageId}/vocabulary`);
    }

    findOne(languageId: number, id: number){
        return this.http.get<ApiResponse<VocabularyResponse>>(`api/${languageId}/vocabulary/${id}`);
    }

    update(vocabulary: Vocabulary, languageId: number, id: number){
        return this.http.patch<ApiResponse<VocabularyResponse>>(`api/${languageId}/vocabulary/${id}`, vocabulary);
    }

    updateTopic(languageId: number, id:number, topic: {id: number | null}){
        return this.http.put(`api/${languageId}/vocabulary/${id}`, topic);
    }

    delete(languageId: number, id: number){
        return this.http.delete(`api/${languageId}/vocabulary/${id}`);
    }

}