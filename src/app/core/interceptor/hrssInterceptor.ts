import { Injectable } from "@angular/core";

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams,
} from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Config } from "../config/config";
import { catchError, switchMap, finalize, filter, take, map } from "rxjs/operators";
import { CommonService } from "../services/common.service";
import { LoadingSpinnerService } from "src/app/components/common/shared/loading-spinner/loading-spinner.service";
// import 'rxjs/add/operator/map'

@Injectable()
export class HrssInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private commonSrv: CommonService,
    private loaderSrv: LoadingSpinnerService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let skipLoader =
      (typeof req.params.get("skipLoader") != "undefined" &&
        req.params.get("skipLoader")) ||
      req.method == "GET" ||
      Config.isUserOnChatBot;
    let overrideLoader =
      typeof req.params.get("skipLoader") != "undefined" &&
      req.params.get("skipLoader");
    skipLoader = overrideLoader ? false : skipLoader;
    if (Config.loggedIn && this.additionalConditions(req)) {
      // Clone the request and set the new header in one step.
      req = req.clone({
        // setHeaders: {
        //   Authorization: `Bearer ${
        //     this.commonSrv.getToken()?.access_token
        //   }`,
        // },
        withCredentials: true,
      });
    } else {}

   
    return next
      .handle(req)
      .pipe((event: any) => {
        if (event instanceof HttpResponse && this.additionalConditions(req)) {
          !skipLoader && this.loaderSrv.hideLoaderOnCount();
        }
        return event;
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (this.additionalConditions(req)) {
            !skipLoader && this.loaderSrv.hideLoaderOnCount();
          }
          return this.handleError(req, error, next);
        })
      );
  }

  handleError(_req: HttpRequest<any>, err: HttpErrorResponse, next: HttpHandler): any {
    return throwError(err);
  }

  additionalConditions(request: HttpRequest<any>) {
    return !(
      request.url.endsWith("environment.json") 
    );
  }
}
