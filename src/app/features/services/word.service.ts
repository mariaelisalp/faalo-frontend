import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { WordResponse } from "../interfaces/response/word-response.interface";
import { Word } from "../interfaces/word.interface";

@Injectable({
  providedIn: 'root'
})
export class WordService {

    constructor(private http: HttpClient){}

    create(word: Word, vocabularyId: number){
        return this.http.post<ApiResponse<WordResponse>>(`api/${vocabularyId}/words`, word);
    }

    findMany(vocabularyId: number){
        return this.http.get<ApiResponse<WordResponse[]>>(`api/${vocabularyId}/words`,);
    }

    findOne(vocabularyId: number, id: number){
        return this.http.get<ApiResponse<WordResponse>>(`api/${vocabularyId}/words/${id}`);
    }

    update(word: Word, vocabularyId: number, id: number){
        return this.http.patch<ApiResponse<WordResponse>>(`api/${vocabularyId}/words/${id}`, word);
    }

    delete(vocabularyId: number, id: number){
        return this.http.delete(`api/${vocabularyId}/words/${id}`);
    }

}