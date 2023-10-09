import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JctsmsReportService } from '../jctsms-report.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastService } from '../../../../../components/common/shared/custom-elements/custom-toast/toast-service.service';


@Component({
  selector: 'app-sms-reports-details',
  templateUrl: './sms-reports-details.component.html',
  styleUrls: ['./sms-reports-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class SMSReportsDetailsComponent implements OnInit {

  pageEvent: any;
  pageIndex: number = 1;
  pageSize: number = 7;
  searchValue: any = '';
  initialflag: boolean = false;
  ELEMENT_DATA: any = [];
  dataSource = this.ELEMENT_DATA;
  subscription: Subscription;
  missedReportId: any;
  total: number;
  selectedCampaign: any = {};
  differenceVal: any;
  updatedDateTime: any;
  updatedDate: any;
  now = moment();
  differencedays: any;
  differenceMin: any
  @Input() virtualSection: any;

  constructor(private router: Router, private missedChartSectionService: JctsmsReportService, public toastservice: ToastService) { }

  ngOnInit(): void {
    this.selectedCampaign = this.missedChartSectionService.selectedCampaign;
    if (this.selectedCampaign?.campaignId) {
      this.missedtableDetails(this.pageIndex, this.pageSize, "");
    };
  }


  missedtableDetails(pageIndex: any, pageSize: any, searchStr: any) {
    let payload: any = {
      "campaignId": this.selectedCampaign?.campaignId,
      page: pageIndex,
      limit: pageSize,
      search: searchStr,
    };
    this.missedChartSectionService.reportsDetails(payload).subscribe((res: any) => {
      if (res.status === 'Success') {
        res.result = res.result[0];
        this.ELEMENT_DATA = res.result;
        this.dataSource = res.result.detResp;
        this.total = res.result?.count;
        this.updatedDateTime = res.result?.['dateTime']
        if (this.updatedDateTime) {
          this.updatedDate = moment(this.updatedDateTime).format('DD/MM/YYYY');
          let getDate = moment(this.updatedDateTime).format('YYYY-MM-DD');
          let getTime = moment(this.updatedDateTime);
          this.differencedays = Math.abs(this.now.diff(getDate, "days"));
          if (this.differencedays > 1)
            this.differenceVal = this.differencedays + " days"
          else {
            this.differenceVal = this.differencedays + " day"
          }
          if (this.differencedays === 0) {
            this.differenceMin = Math.abs(this.now.diff(getTime, "minutes"));
            if (this.differenceMin > 1) {
              this.differenceVal = this.differenceMin + " minutes"
            }
            else {
              this.differenceVal = this.differenceMin + " minute"
            }
          }
        }

      }
    },
      (error: any) => {
        this.ELEMENT_DATA = [];
        this.dataSource = this.ELEMENT_DATA;
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error'
        })
      });
  }

  outputSearch(event: any) {
    this.searchValue = event;
    this.applyFilter(event);
  }

  applyFilter(event: Event) {
    this.initialflag = false;
    if (this.searchValue?.length > 2) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.missedtableDetails(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.missedtableDetails(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  getCurrentPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.missedtableDetails(event.pageIndex, event.pageSize, this.searchValue);
  }

  goBacktoReportList() {
    this.router.navigateByUrl('/landing/services/sms-report');
  }

  downloadCampaignReport(filetype: string) {
    this.subscription = this.missedChartSectionService
      .downloadReport({ campaignId: this.selectedCampaign?.campaignId, format: filetype })
      .subscribe((result: any) => {
        let pdfUrl = URL.createObjectURL(result);
        var fileLink = document.createElement('a');
        fileLink.href = pdfUrl;
        fileLink.download = 'Report.' + filetype.toString();
        fileLink.click();
        this.toastservice.showToast({
          title: 'File downloaded successfully',
          kind: 'success',
        });
      });
  }
  refreshapi() {
    this.pageIndex = 1;
    this.pageSize = 7;
    this.missedtableDetails(this.pageIndex, this.pageSize, "");
  }
}
