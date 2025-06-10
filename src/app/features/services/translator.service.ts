import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Translation } from "../interfaces/translation.interface";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { TranslatorResponse } from "../interfaces/response/translator-response.interface";

@Injectable({
  providedIn: 'root'
})

export class TranslatorService{

  constructor(private http: HttpClient){}

  translate(obj: Translation){

    return this.http.post<ApiResponse<TranslatorResponse>>('api/translate', obj);
  }

}