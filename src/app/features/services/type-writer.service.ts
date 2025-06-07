import { Injectable } from "@angular/core";
import { concat, concatMap, delay, from, ignoreElements, interval, map, of, repeat, take } from "rxjs";

interface TypeParams {
  word: string;
  speed: number;
  backwards?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TypeWriterService {

    private type({ word, speed, backwards = false }: TypeParams) {
        return interval(speed).pipe(
            map(x => backwards ? word.substring(0, word.length - x) : word.substring(0, x + 1)),
            take(word.length)
        );

    }

    typeEffect(word: string) {
        return concat(
            this.type({ word, speed: 70 }),
            of('').pipe(delay(1200), ignoreElements()),
            this.type({ word, speed: 50, backwards: true }),
            of('').pipe(delay(300), ignoreElements())
        );
    }

    getTypewriterEffect(titles: string[]) {
    return from(titles).pipe(
      concatMap(title => this.typeEffect(title)),
      repeat()
    );
 }

}