import { ModuleType } from "../../enum/module-type.enum";

export interface ExampleResponse {
    id: number;
    moduleId: number;
    moduleType: ModuleType;
    content: string;
    createdAt: string;
    updatedAt: string;
}