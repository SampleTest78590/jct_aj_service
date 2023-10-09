import { Injectable } from '@angular/core';
import { Config } from '../../../core/config/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class JctSmsService {
  getsmsList: BehaviorSubject<any> = new BehaviorSubject<any>({});
  getSmsListObserver = this.getsmsList.asObservable();
  urllink: any;
  private baseUrl: string = Config.baseUrl;
  // private baseUrl: string = 'https://hrplatformdev.ril.com/api/';
  private KycStatusUrl: string = this.baseUrl + 'jct-kyc-i/';
  private SmsCampUrl: string = this.baseUrl + 'jct-sms-i/sms/';
  private jctSMSUrl: string = this.baseUrl + 'jct-sms-i/';
  smsStarted:boolean = false;
  constructor(private http: HttpClient, private router: Router) {

  }

  getOnboardingSMSCampDetail(journeyid: any) {
    if (journeyid) {
      this.urllink = 'getJourneyDetails?journeyId=' + journeyid
    } else {
      this.urllink = 'getJourneyDetails'
    }
    return this.http.get(this.SmsCampUrl + this.urllink);
  }
  previewCampSMSCamp(obj: any) {
    return this.http.post(this.SmsCampUrl + 'previewCampaign', obj);
  }
  createSmsCampaign(obj: any) {
    return this.http.post(this.SmsCampUrl + 'createCampaign', obj);
  }
  discardSMSApi(obj: any) {
    return this.http.post(this.SmsCampUrl + 'discardCampaign', obj);
  }
  getsmsListApi(obj: any) {
    return this.http.post(this.SmsCampUrl + 'getsmsList', obj);
  }

  previewAPIKey() {
    return this.http.get(this.jctSMSUrl + 'previewAPISetting', {});
  }

  selectSmsType(obj: any) {
    return this.http.post(this.jctSMSUrl + 'getSmsType', obj);
  }
 
  validateleadlist(obj: any) {
    return this.http.post(this.jctSMSUrl + 'validateleadlist', obj);
  }
  smsleadlistupload(obj: any) {
    return this.http.post(this.jctSMSUrl + 'leadlistupload', obj);
  }
  
  submitSMSCampService(obj: any) {
    return this.http.post(this.SmsCampUrl + 'submitCampaign', obj);
  }

  testCampaignForSMS(obj:any){
    return this.http.post(this.jctSMSUrl + 'testSMS', obj);
  }
  getsmsLanguage(obj: any) {
    return this.http.post(this.SmsCampUrl + 'getSmsLang', obj);
  }
}




