import { ModuleType } from "../../enum/module-type.enum";

export interface TopicResponse {
    id: number;
    language: number;
    name: string;
    parent: number;
    moduleType: ModuleType;
    createdAt: string,
    updatedAt: string,
}