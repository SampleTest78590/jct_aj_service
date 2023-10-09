import { Injectable } from '@angular/core';
import { Config } from '../../../core/config/config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class JctMisscallService {
  getmcmList: BehaviorSubject<any> = new BehaviorSubject<any>({});
  getMcmListObserver = this.getmcmList.asObservable();
  stageValue: any;
  urllink:any;
  setEntityID =new  BehaviorSubject(0)
  private baseUrl: string = Config.baseUrl;
  // private baseUrl: string = 'https://hrplatformdev.ril.com/api/';
  private KycStatusUrl: string = this.baseUrl + 'jct-kyc-i/';
  private miscallUrl: string = this.baseUrl + 'jct-mcs-i/';
  private smsTemplateUrl: string = this.baseUrl + 'jct-sms-i/sms/';
  private smsTemplateUrl2: string = this.baseUrl + 'jct-sms-i/';
  missedcallStarted:boolean = false;
  
  constructor(private http: HttpClient, private router: Router) {

  }

  kycStatusApi(obj: any) {
    return this.http.post(this.KycStatusUrl + 'getKycDetails', obj);
  }
  getVirtualNumList() {
    return this.http.get(this.miscallUrl + 'mcs/getCallerId');
  }
  smsTempValidaition(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/getSmsTemplateWithFilters', obj);
  }

  saveSmsConfig(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/saveSmsConfig', obj);
  }
  addNewSenderID(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/addNewSenderID', obj);
  }

  getEntityId() {
    return this.http.post(this.miscallUrl + 'mcs/getEntityId', {});
  }

  updateEntityId(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/updateEnityId', obj);
  }
  
  getMcmList(obj: any) {

    return this.http.post(this.miscallUrl + 'mcs/getMcmList', obj);

  }

//   submitMissedData(obj:any){
//     return this.http.post(this.miscallUrl + 'mcs/updateEnityId', obj);
//   }
  discardApi(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/discardCampaign', obj);
  }
  getOnboardingDetail(journeyid:any) {
    if(journeyid)
    {
      this.urllink = 'mcs/getOnBoardingDetails?journeyId='+ journeyid
    }else{
    this.urllink = 'mcs/getOnBoardingDetails'
    }
    return this.http.get(this.miscallUrl + this.urllink);
  }
  previewCamp(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/previewCampaign', obj);
  }
  createCampaign(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/createCampaign', obj);
  }
  getSenderIdList(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/getSenderIdList', obj);
  }
  saveSMSTemplate(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/saveSMSTemplate', obj);
  }
  createNewLeadList(obj:any){
    return this.http.post(this.miscallUrl + 'mcs/createLeadList', obj);
  }
  getSmsTemp(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/getSmsTemplate', obj);
  }
  submitService(obj: any) {
    return this.http.post(this.miscallUrl + 'mcs/submitCampaign', obj);
  }
  getSmsLanguage(payload: any){
    return this.http.post(this.smsTemplateUrl + 'getSmsLang', payload);
  }
  getSmsType(payload: any){
    return this.http.post(this.smsTemplateUrl2 + 'getSmsType', payload);
  }
  removeVnFromCampaign(payload: any){
    return this.http.post(this.miscallUrl + 'mcs/' + 'removeVnFromCamp', payload);
  }
  
}




