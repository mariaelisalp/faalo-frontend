import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note.interface";
import { ApiResponse } from "../../core/interfaces/response/api-response.interface";
import { ModuleType } from "../enum/module-type.enum";
import { NoteResponse } from "../interfaces/response/note-response.interface";

@Injectable({
  providedIn: 'root'
})
export class NoteService{

    constructor(private http: HttpClient){}

    create(note: Note, moduleId: number){
        return this.http.post<ApiResponse<NoteResponse>>(`api/${moduleId}/note`, note);
    }

    findMany(moduleId: number, moduleType: ModuleType){
        return this.http.get<ApiResponse<NoteResponse[]>>(`api/${moduleId}/note?moduleType=${moduleType}`);
    }

    findOne(){}

    update(note: Note, id: number, moduleId: number){
        console.log(note)
        return this.http.patch<ApiResponse<NoteResponse>>(`api/${moduleId}/note/${id}`, note);
    }

    delete(moduleId: number, id: number){
        return this.http.delete(`api/${moduleId}/note/${id}`)
    }
}