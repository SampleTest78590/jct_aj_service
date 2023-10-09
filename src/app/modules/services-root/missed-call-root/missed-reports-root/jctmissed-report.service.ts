import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/core/config/config';

@Injectable({
  providedIn: 'root'
})
export class JctmissedReportService {
  private baseUrl: string = Config.baseUrl;
  // private baseUrl: string = 'https://hrplatformdev.ril.com/api/';
  private missedreportUrl: string = this.baseUrl + 'jct-mcs-i/mcs/';
  reportDetailData: any = [];
  selectedCampaign: any = {};
  constructor(private http: HttpClient) { }

  virtualSection(payload: any) {
    return this.http.post(this.missedreportUrl + 'previewCampaign', payload);
  }

  missedSummary(payload: any) {
    return this.http.post(this.missedreportUrl + 'mcsReport', payload);
  }

  reportsDetails(payload: any) {
    return this.http.post(this.missedreportUrl + 'detailedReport', payload);
  }
  getCampaignList(search = '') {
    return this.http.post(this.missedreportUrl + 'getCampaignList', search);
  }
  downloadReport(payload: any) {
    return this.http.post(this.missedreportUrl + 'downloadReport', payload, {
      responseType: 'blob' as 'json',
    });
  }
}
