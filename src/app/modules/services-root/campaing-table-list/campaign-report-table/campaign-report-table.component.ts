import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-campaign-report-table',
  templateUrl: './campaign-report-table.component.html',
  styleUrls: ['./campaign-report-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class CampaignReportTableComponent implements OnInit {
  subscription: Subscription;
  ELEMENT_DATA: any = [];
  pageIndex: number = 1;
  isopenNewContact: boolean = false;
  pageSize: number = 7;
  total: number = 0;
  searchValue: any = '';
  dataSource: any = [];
  initialflag: any = false;
  campaignReportId: any;
  connectedEntry: any;
  campaignId: any;
  campStatus: any;
  storeConnected: any;
  differenceVal: any;
  updatedDateTime: any;
  updatedDate: any;
  now = moment();
  differencedays: any;
  differenceMin: any
  sortingDirections: any = {
    Name: 'asc',
  };
  campStatusData: any = [];
  @Output() getCampaignDetails: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  campaignName: any;

  constructor(
    private service: JctServicesService,
    private router: Router,
    private toastservice: ToastService
  ) { }

  ngOnInit(): void {
    this.campaignReportId = window.history.state.campdata?.campaignId;
    this.campStatusData = window.history.state.campdata?.campaignStatus;
    this.campaignName = window.history.state.campdata?.campaignName;
    this.getCampReportData(this.pageIndex, this.pageSize, '');
  }

  refreshData() {
    this.pageIndex = 1;
    this.getCampReportData(this.pageIndex, this.pageSize, '');
  }

  getCampReportData(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
      campaignId: this.campaignReportId,
      campaignStatus: this.campStatusData

    };
    this.subscription = this.service.getCampaignReport(payload).subscribe(
      (response: any) => {
        if (response) {
          this.ELEMENT_DATA = response.result?.dataArr;
          this.total = response.result?.count;
          this.dataSource = this.ELEMENT_DATA;
          this.updatedDateTime = response.result?.['last-updated-dateTime']
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
        } else {
          this.ELEMENT_DATA = [];
          this.total = 0;
          this.dataSource = this.ELEMENT_DATA;
          this.toastservice.showToast({
            title: response.message,
            kind: 'error',
          });
        }
      },
      (error) => {
        this.ELEMENT_DATA = [];
        this.total = 0;
        this.dataSource = this.ELEMENT_DATA;
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      }
    );
  }

  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getCampReportData(this.pageIndex, this.pageSize, this.searchValue);
  }

  getCurrentPage(event: any) {
    //this.initialflag = false;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCampReportData(event.pageIndex, event.pageSize, this.searchValue);
  }

  navigateToCampReport() {
    let campdataObj = {
      campaignId: this.campaignReportId,
      campaignStatus: this.campStatusData,
      campaignName: this.campaignName
    }
    this.router.navigate(['/landing/services/campaign-report'],
      { state: { campdata: campdataObj }, },
    );

  }
  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;
      switch (sort) {
        case 'Name':
          return this.compare(
            a.Name?.toLowerCase(),
            b.Name?.toLowerCase(),
            isAsc
          );
        default:
          return 0;
      }
    });
    this.sortingDirections[sort] === 'asc'
      ? (this.sortingDirections[sort] = 'dsc')
      : (this.sortingDirections[sort] = 'asc');
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a == b ? 0 : a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortDate(a: any, b: any, isAsc: boolean) {
    var dateA = new Date(a).getTime();
    var dateB = new Date(b).getTime();
    return isAsc ? (dateA > dateB ? 1 : -1) : dateB > dateA ? 1 : -1;
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
      this.getCampReportData(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.getCampReportData(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  downloadCampaignReport(filetype: string) {
    this.subscription = this.service
      .downloadReport(this.campaignReportId, filetype)
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
}
