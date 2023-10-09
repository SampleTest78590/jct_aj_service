import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'full-height'}
})
export class ManageContactComponent implements OnInit {
  isopenUploadleadList: boolean = false;
  subscription: Subscription;
  displayedColumns: string[] = [
    'checkBox',
    'leadListName',
    'uploadedBy',
    'noOfLeads',
    'dateCreated',
    'action',
  ];
  ELEMENT_DATA: any = [];
  sortingDirections: any = {
    leadListName: 'asc',
    noOfList: 'asc',
    dateCreated: 'asc',
  };

  dataSource: any = [];
  // pageEvent: PageEvent;
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;
  searchValue: any = '';
  stagevalue: any;
  isselectAll = false;
  initialflag: boolean = false;
  constructor(
    private service: JctServicesService,
    public toastservice: ToastService
  ) {}

  ngOnInit(): void {
    if (this.service.stageValue) {
      this.stagevalue = this.service.stageValue;
    }
    this.service.getLeadListObserver.subscribe((res:any)=>{
      if (res.result?.dataArr?.length > 0) {
        this.ELEMENT_DATA = res.result.dataArr;
        this.total = res.result?.count;
        this.ELEMENT_DATA.forEach((element:any) => {
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
    this.getLeadList(this.pageIndex, this.pageSize, '');
  }

  getLeadList(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    };
    this.subscription = this.service.getLeadList(payload).subscribe(
      (res: any) => {
        if(res){
          this.service.getleadList.next(res);
        }
      },(error: any) => {
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
    // this.initialflag = false;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getLeadList(event.pageIndex, event.pageSize, this.searchValue);
  }

  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;
      switch (sort) {
        case 'leadListName':
          return this.compare(
            a.leadName.toLowerCase(),
            b.leadName.toLowerCase(),
            isAsc
          );
        case 'uploadedBy ':
          return this.compare(
            a.createdBy.toLowerCase(),
            b.createdBy.toLowerCase(),
            isAsc
          );
        case 'dateCreated':
          return this.sortDate(a.createdOn, b.createdOn, isAsc);
        case 'noOfLeads':
          return this.compare(parseInt(a.count), parseInt(b.count), isAsc);

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

  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getLeadList(this.pageIndex, this.pageSize, this.searchValue);
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
      this.getLeadList(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.getLeadList(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  openUploadLeadList() {
    this.isopenUploadleadList = !this.isopenUploadleadList;
  }
  closeModal(event: any) {
    if (event) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.getLeadList(this.pageIndex, this.pageSize, '');
    }
    this.isopenUploadleadList = false;
  }

  getInitials(str: string) {
    const strArr = str.split(' ');
    let initial = strArr[0].substring(0, 1);
    if (strArr.length >= 2) {
      initial += strArr[strArr.length - 1].substring(0, 1);
    }
    return initial.toUpperCase();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  backToStart() {
    this.service.startMenuChange.next({
      subname:"getting-started",
      subroute: "/landing/services/welcome"
    });
  }
  SelectAllContact(data: any) {
    if (data.target.checked) {
      this.isselectAll = true;
      this.ELEMENT_DATA.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      this.isselectAll = false;
      this.ELEMENT_DATA.forEach((element: any) => {
        element.checked = false;
      });
    }
  }

  checkSingleElement(element: any) {
    element.checked = !element.checked;
    let selectedList = [];
    this.ELEMENT_DATA.forEach((element: any) => {
      if (element.checked) {
        selectedList.push(element);
      }
    });
    if (selectedList?.length === this.ELEMENT_DATA?.length) {
      this.isselectAll = true;
    } else {
      this.isselectAll = false;
    }
  }
}
