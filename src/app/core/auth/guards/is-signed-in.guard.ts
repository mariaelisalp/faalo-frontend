import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../token.service";

@Injectable({
  providedIn: 'root'
})
export class IsSignedIn implements CanActivate{

  constructor(private token: TokenService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if(this.token.getToken()){

      this.router.navigate(['/home']);
    }

    return true;
  }
}
