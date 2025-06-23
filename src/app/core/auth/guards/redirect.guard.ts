import { CanActivate, Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { NavigationService } from "../navigation.service";

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {
  constructor(private navigationService: NavigationService, private router: Router) {}

  canActivate(): boolean {
    if (this.navigationService.wasRedirectedHere()) {
      return true;
    } 

    else {

      this.router.navigate(['/home']);
      return false;
    }
  }
}