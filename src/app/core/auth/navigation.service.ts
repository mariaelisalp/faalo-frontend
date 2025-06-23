import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private redirected = false;

    setRedirected(value: boolean) {
        this.redirected = value;
    }

    wasRedirectedHere(): boolean {
        return this.redirected;
    }

}
