import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class JctsmsReportService {
  private baseUrl: string = Config.baseUrl;
  // private baseUrl: string = 'https://hrplatformdev.ril.com/api/';
  private missedreportUrl: string = this.baseUrl + 'jct-mcs-i/mcs/';
  private smsreportUrl: string = this.baseUrl + 'jct-sms-i/';
  reportDetailData: any = [];
  selectedCampaign: any = {};
  constructor(private http: HttpClient) { }

  // virtualSection(payload: any) {
  //   return this.http.post(this.missedreportUrl + 'previewCampaign', payload);
  // }

  missedSummary(payload: any) {
    return this.http.post(this.smsreportUrl + 'smsReport', payload);
  }

  reportsDetails(payload: any) {
    return this.http.post(this.smsreportUrl + 'sms/detailedReport', payload);
  }
  getCampaignList(search = '') {
    return this.http.post(this.smsreportUrl + 'sms/getSmsCampList', search);
  }

  smsSendTime(payload: any) {
    return this.http.post(this.smsreportUrl + 'sms/smsSendTime', payload);
  }
  downloadReport(payload: any) {
    return this.http.post(this.smsreportUrl + 'downloadReport', payload, {
      responseType: 'blob' as 'json',
    });
  }
}
