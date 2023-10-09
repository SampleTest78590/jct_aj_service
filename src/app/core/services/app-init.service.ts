import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Config } from "../config/config";

@Injectable()
export class AppInitService {
  constructor(private httpClient: HttpClient) { }

  init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  loadUrls(): Promise<any> {
    const promise = this.httpClient
      .get("./assets/config/environment.json")
      .toPromise()
      .then((env: any) => {
        environment.production = env.production;

        // environment.DOMAIN_URL = env.DOMAIN_URL;
        // environment.HR_URL = env.HR_URL;
        // environment.COMMON_UTIL = env.COMMON_UTIL;
        // Config.enableOtp = env.enableOtp;
        // Config.enablesocket = env.enablesocket;
        // Config.enableFirebase = env.enableFirebase;
        // // Config.baseUrl = env.HR_URL + "/api/";
        // Config.domainUrl = env.HR_URL;
        // Config.elastic_search = env.HR_URL + "/";

        // Config.vehicleLogUrl = env.VEHICLE_LOG;
        // Config.covUrl = env.COV;

        // sessionStorage.setItem("baseURL", environment.HR_URL);
        // sessionStorage.setItem("env", JSON.stringify(env));
        // // Apm Rum
        // environment.apmUrl = env.apmUrl;
        environment.env = env.env;
        return env;
      });
    return promise;
  }
}
