import { ModuleType } from "../enum/module-type.enum";

export interface Note {
    content: string;
    moduleType: ModuleType;
}