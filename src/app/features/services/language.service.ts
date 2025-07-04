import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../interfaces/language.interface';
import { ApiResponse } from '../../core/interfaces/response/api-response.interface';
import { LanguageResponse } from '../interfaces/response/language-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  create(language: Language){
    return this.http.post('api/languages', language);
  }

  findMany(){
    return this.http.get<ApiResponse<LanguageResponse[]>>('api/languages');
  }

  findOne(id: number){
    return this.http.get<ApiResponse<LanguageResponse>>(`api/languages/${id}`);
  }

  update(id: number, language: Language){
    return this.http.patch(`api/languages/${id}`, language);
  }

  delete(id: number){
    return this.http.delete(`api/languages/${id}`)
  }

}
