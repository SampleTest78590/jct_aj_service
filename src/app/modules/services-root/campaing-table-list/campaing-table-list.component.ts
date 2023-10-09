import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ConfirmationPopupComponent } from 'src/app/components/common/shared/custom-elements/confirmation-popup/confirmation-popup.component';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-campaing-table-list',
  templateUrl: './campaing-table-list.component.html',
  styleUrls: ['./campaing-table-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class CampaingTableListComponent implements OnInit {
  subscription: Subscription;
  displayedColumns: string[] = [
    'checkBox',
    'campaignName',
    // 'vnNumberAssigned',
    'list',
    'campaignStatus',
    'dateCreated',
    'action',
  ];
  ELEMENT_DATA: any = [];
  dataSource = this.ELEMENT_DATA;
  pageEvent: any;
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;
  searchValue: any = '';
  stagevalue: any;
  isopenCampaignModal = false;
  initialflag: boolean = false;
  isselectAll = false;
  sortingDirections: any = {
    campaignName: 'asc',
    vnNumberAssigned: 'asc',
    dateCreated: 'asc',
  };
  isMenuOpen: boolean = false;
  createCampignData: any;

  constructor(
    private service: JctServicesService,
    private router: Router,
    public toastservice: ToastService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    if (this.service.stageValue) {
      this.stagevalue = this.service.stageValue;
    }
    this.service.campaignID = '';
    this.service.NewCampaignData = {};
    this.campaignList(this.pageIndex, this.pageSize, '');

    this.service.getCampaignListObserver.subscribe((response: any) => {
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
      }
    });
    if (window.history.state.CampFlag === 'A'){
      this.openNewCampaign();
      this.createCampignData = {
        campname: window.history.state.CampName,
        campdesc: window.history.state.CampDescription,
        campcateg: window.history.state.selectedcategory
      }
    }
  }

  campaignList(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    };
    this.subscription = this.service.getCampList(payload).subscribe(
      (response: any) => {
        if (response) {
          this.service.getCampaignList.next(response);
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
    this.campaignList(event.pageIndex, event.pageSize, this.searchValue);
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
        case 'vnNumberAssigned':
          return this.compare(a.callerId, b.callerId, isAsc);
        case 'dateCreated':
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

  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.campaignList(this.pageIndex, this.pageSize, this.searchValue);
  }

  applyFilter(event: Event) {
    this.initialflag = false;
    if (this.searchValue?.length > 2) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.campaignList(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.campaignList(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  navigateToCamp(event: any) {
    this.service.campaignID = event.campaignId;
    this.router.navigateByUrl('/landing/services/campaign');
  }

  backToStart() {
    this.service.startMenuChange.next({
      subname: 'getting-started',
      subroute: '/landing/services/welcome',
    });
  }

  openNewCampaign() {
    this.isopenCampaignModal = !this.isopenCampaignModal;
  }

  closeModal(result: any) {
    if (result) {
      this.service.NewCampaignData = result.data; //setting global value
      this.service.newCampflag = true;
      this.router.navigateByUrl('/landing/services/campaign');
    }
    this.isopenCampaignModal = false;
  }

  SelectAll(data: any) {
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

  getInitials(str: string) {
    const strArr = str?.split(' ');
    let initials = '';
    strArr?.map((item) => {
      initials += item?.trim().substring(0, 1);
    });
    return initials?.toUpperCase().trim();
  }

  outputSearch(event: any) {
    this.searchValue = event;
    this.applyFilter(event);
  }

  onOpenMenuClick(index: any, event: any) {
    // this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
    this.dataSource.forEach((v: any, i: any) => {
      if (i === index) {
        v.isMenuOpen = !v.isMenuOpen;
      } else {
        v.isMenuOpen = false;
      }
    });
  }

  campaignActions(actionVal: any, element: any) {
    if (actionVal == 'C' || actionVal == 'P' || actionVal == 'R') {
      let actionName =
        actionVal == 'C'
          ? 'Stop'
          : actionVal == 'P'
          ? 'Pause'
          : actionVal == 'R'
          ? 'Resume'
          : '';
      let statusPayload: any = {
        campaignId: element?.campaignId,
        flag: actionVal,
        campaignData: {
          campaignId: element?.campaignId,
        },
      };
      this.dialogService.open(ConfirmationPopupComponent, {
        data: {
          header: actionName + ' Campaign',
          buttonText: actionName + ' Campaign',
          subheader: 'Are you sure you want ' + actionName + ' this Campaign?',
          type: event,
        },
        sidebarPosition: 'center',
        width: '500px',
        close: (reason: any) => {
          if (reason) {
            this.service.updateCampaignstatus(statusPayload).subscribe(
              (resp: any) => {
                if (resp.status == 'Success') {
                  this.toastservice.showToast({
                    title: resp?.message,
                    kind: 'success',
                  });
                  this.pageIndex = 1;
                  this.campaignList(this.pageIndex, this.pageSize, '');
                } else {
                  this.toastservice.showToast({
                    title: resp?.message,
                    kind: 'error',
                  });
                }
              },
              (error: any) => {
                this.toastservice.showToast({
                  title: error?.error?.message,
                  kind: 'error',
                });
              }
            );
            this.dialogService.close();
          }
        },
      });

    } else if (actionVal == 'reports') {
      let campdataObj = {
        campaignId: element.campaignId,
        campaignStatus: element.campaignStatus,
        campaignName: element.campaignName
      }
      this.router.navigate(['/landing/services/campaign-report'], { state:{ campdata: campdataObj}
        // queryParams: { campaignId: element.campaignId },
      });
    } else {
      this.navigateToCamp(element);
    }
  }
}
