import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctmissedReportService } from '../missed-reports-root/jctmissed-report.service';

@Component({
  selector: 'app-missed-call-mgn',
  templateUrl: './missed-call-mgn.component.html',
  styleUrls: ['./missed-call-mgn.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' },
})
export class MissedCallMgnComponent implements OnInit {

  ELEMENT_DATA: any = [];
  sortingDirections: any = {
    campaignName: 'asc',
    createdOn: 'asc',
  };

  dataSource: any = [];
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;
  searchValue: any = '';
  isselectAll = false;
  initialflag: boolean = false;
  subscription: any;
  constructor(private jctmcmservice: JctMisscallService, private missedCallReportService: JctmissedReportService, private router: Router,
    public toastservice: ToastService,) { }


  ngOnInit(): void {
    this.jctmcmservice.getMcmListObserver.subscribe((res: any) => {
      if (res.result?.dataArr?.length > 0) {
        this.ELEMENT_DATA = res.result.dataArr;
        this.total = res.result?.count;
        this.ELEMENT_DATA.forEach((element: any) => {
          element.initials = this.getInitials(element.createdBy);
        });
        this.dataSource = this.ELEMENT_DATA;

      } else {
        if (this.searchValue === '') {
          this.initialflag = true;
        }
        this.ELEMENT_DATA = res.result?.dataArr;
        this.total = res.result?.count;
        this.dataSource = this.ELEMENT_DATA;
        // this.toastservice.showToast({
        //   title: 'No data found',
        //   kind: 'error',
        // });
      }
    });
    this.mcmList(this.pageIndex, this.pageSize, '');
  }

  mcmList(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    };
    this.subscription = this.jctmcmservice.getMcmList(payload).subscribe(
      (res: any) => {
        if (res) {
          this.jctmcmservice.getmcmList.next(res);
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
  getCurrentPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.mcmList(event.pageIndex, event.pageSize, this.searchValue);
  }
  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.mcmList(this.pageIndex, this.pageSize, this.searchValue);
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
      this.mcmList(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.mcmList(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;
      switch (sort) {
        case 'campaignName':
          return this.compare(
            a.campaignName.toLowerCase(),
            b.campaignName.toLowerCase(),
            isAsc
          );
        case 'createdOn':
          return this.sortDate(a.createdOn, b.createdOn, isAsc);


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
  getInitials(str: string) {
    const strArr = str.split(' ');
    let initial = strArr[0].substring(0, 1);
    if (strArr.length >= 2) {
      initial += strArr[strArr.length - 1].substring(0, 1);
    }
    return initial.toUpperCase();
  }
  openNewCampaign() {
    this.router.navigate(['/landing/services/missed-call'],
      { state: { CampFlag: 'C' }, },
    );

  }
  previewCampaign(campid: any) {
    this.router.navigate(['/landing/services/missed-call'],
      { state: { CampFlag: 'P', CampId: campid }, },
    );

  }

  campaignActions(actionVal: any, element: any) {
    if (actionVal == 'reports') {
      this.missedCallReportService.selectedCampaign = element;
      this.router.navigate(['/landing/services/missed-reports']
      )
    }

  }
}

