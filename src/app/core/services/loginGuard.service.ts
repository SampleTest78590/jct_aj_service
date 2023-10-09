import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
  } from "@angular/router";
  import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Config } from "../config/config";
import { CookieService } from 'ngx-cookie-service';
  
  @Injectable()
  export class LoginGuardService {
    constructor(
      private router: Router,
      private cookieSrv: CookieService
    ) {}

    canActivate(
      route: ActivatedRoute,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (Config.landingUrl === "") {
        Config.landingUrl = state.url != "/" ? state.url : "";
      }
      if (!navigator.onLine) {
        return false;
      } else {
        if (Config.loggedIn) {          
          return true;
        }else if(route.routeConfig?.path=='set-password' && (state.root.queryParams['linkid'])|| Config.allowSetPassword){
          return true
        }
        this.router.navigate([""]);;
        return false;
      }
    }

    // getUserCookie() {
    //   Config.loggedIn = false;
    //   let abc = this.cookieSrv.get('JFSSO');
    //   console.log(abc);
    //   let dataList: Array<string> = document.cookie.split(";");
    //   for (let item of dataList) {
    //     if (item.trim().includes("JFSSO")) {
    //       let user = item.split("JFSSO=");
    //       Config.userCookie = JSON.parse(decodeURIComponent(user[1]));
    //       Config.loggedIn = true;
    //     }
    //   }
    // }

}