import { SuportedLanguagesSource } from "../enum/suported-languages-source.enum";
import { SuportedLanguagesTarget } from "../enum/suported-languages-target.enum";

export interface Translation {
    source: SuportedLanguagesSource;
    target: SuportedLanguagesTarget;
    content: string;
}