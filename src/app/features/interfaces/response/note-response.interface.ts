import { ModuleType } from "../../enum/module-type.enum";

export interface NoteResponse {
    id: number;
    content: string;
    moduleId: number;
    moduleType: ModuleType;
    createdAt: string,
    updatedAt: string,
}