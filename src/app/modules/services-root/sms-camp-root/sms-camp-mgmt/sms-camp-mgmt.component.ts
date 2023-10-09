import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctsmsReportService } from '../sms-reports-root/jctsms-report.service';

@Component({
  selector: 'app-sms-camp-mgmt',
  templateUrl: './sms-camp-mgmt.component.html',
  styleUrls: ['./sms-camp-mgmt.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class SmsCampMgmtComponent implements OnInit {
  subscription: Subscription;
  ELEMENT_DATA: any = [];
  // dataSource = new MatTableDataSource<any>([]);
  dataSource = this.ELEMENT_DATA;
  pageEvent: any;
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;
  searchValue: any = '';
  initialflag: boolean = false;

  constructor(private router: Router, private smsService: JctSmsService, public toastservice: ToastService, private smsReportService: JctsmsReportService) { }

  ngOnInit(): void {
    this.smsCamptableList(this.pageIndex, this.pageSize, "");

    this.smsService.getSmsListObserver.subscribe((response: any) => {
      if (response.result?.dataArr?.length > 0) {
        this.ELEMENT_DATA = response.result.dataArr;

        this.ELEMENT_DATA.forEach((element: any) => {
          element.checked = false;
          element.pause = element?.campaignStatus == 'ACTIVE' ? true : false;
          element.resume = element?.campaignStatus == 'PAUSED' ? true : false;
          element.stop =
            element?.campaignStatus == 'CREATED' ||
              element?.campaignStatus == 'LEADS-READY' ||
              element?.campaignStatus == 'ACTIVE'
              ? true
              : false;
        });
        this.total = response.result?.count;
        this.dataSource = this.ELEMENT_DATA;
      } else {
        if (this.searchValue === '') {
          this.initialflag = true;
        }
        this.ELEMENT_DATA = [];
        this.total = 0;
        this.dataSource = this.ELEMENT_DATA;
        // this.toastservice.showToast({
        //   title: 'No data found',
        //   kind: 'error',
        // });
      }
    });
  }

  CrateSMSCamp() {
    this.router.navigate(['/landing/services/getting-sms-prev'],
      { state: { CampFlag: 'C' }, },
    );
  }
  previewSMSCampaign(campid: any) {
    this.router.navigate(['/landing/services/getting-sms-prev'],
      { state: { CampFlag: 'P', CampId: campid }, },
    );
  }
  campaignActions(actionVal: any, element: any) {
    if (actionVal == 'reports') {
      this.smsReportService.selectedCampaign = element;
      this.router.navigate(['/landing/services/sms-report']
      )
    }

  }
  outputSearch(event: any) {
    this.searchValue = event;
    this.applyFilter(event);
  }

  smsCamptableList(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    }
    this.subscription = this.smsService.getsmsListApi(payload).subscribe(
      (response: any) => {
        if (response) {
          this.smsService.getsmsList.next(response);
        }
      },
      (error) => {
        this.ELEMENT_DATA = [];
        this.total - 0;
        this.dataSource = this.ELEMENT_DATA;
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error'
        })
      }
    )
  }

  getCurrentPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.smsCamptableList(event.pageIndex, event.pageSize, this.searchValue);
  }

  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.smsCamptableList(this.pageIndex, this.pageSize, this.searchValue);
  }

  applyFilter(event: Event) {
    this.initialflag = false;
    if (this.searchValue?.length > 2) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.smsCamptableList(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.smsCamptableList(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  getInitials(str: string) {
    const strArr = str?.split(' ');
    let initials = '';
    strArr?.map((item) => {
      initials += item?.trim().substring(0, 1);
    });
    return initials?.toUpperCase().trim();
  }
}
