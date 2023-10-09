import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { SmsSettingModalComponent } from './sms-setting-modal/sms-setting-modal.component';
import { AddNewSmsComponent } from './add-new-sms/add-new-sms.component';
import { SenderIdModalComponent } from '../sender-id-modal/sender-id-modal.component';
import { EntityModalComponent } from '../entity-modal/entity-modal.component';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';

@Component({
  selector: 'app-sms-template-landing',
  templateUrl: './sms-template-landing.component.html',
  styleUrls: ['./sms-template-landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class SmsTemplateLandingComponent implements OnInit {
  searchValue: any = '';
  entityIdpse: any;
  subscription: Subscription;
  entityId: any;
  ELEMENT_DATA: any = [];
  dataSource: any = [];
  sortingDirections: any = {
    senderId: 'asc',

  };
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;
  stagevalue: any;
  initialflag: boolean = false;
  missedStarted: any = {
    subname: "getting-started-missed-call",
    subroute: "/landing/services/getting-started"
  };
  SMScampGettingStarted: any = {
    subname: "getting-sms",
    subroute: "/landing/services/getting-sms"
  };

  constructor(private dialogService: DialogService, public misscallService: JctMisscallService,
    public toastservice: ToastService, private router: Router,private jctser:JctServicesService) { }

  ngOnInit(): void {
    if (history.state?.welcomeSms == true) {
      this.dialogService.open(SmsSettingModalComponent, {
        sidebarPosition: '',
        width: '590px',
        data: {

        },
        close: (data: any) => {
          this.pageIndex = 1;
          this.getEntityList();
          this.smsTemplateList(this.pageIndex, this.pageSize, '');
        }
      });
    }
    this.getEntityList();
    this.misscallService.setEntityID.subscribe((res) => {
      if (res) {
        this.entityId = res;

      }

    })
    this.smsTemplateList(this.pageIndex, this.pageSize, '');

  }

  getEntityList() {
    this.subscription =
      this.misscallService.getEntityId().subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            this.misscallService.setEntityID.next(resp?.result[0].entityId)
            this.entityId = resp?.result[0].entityId;



          } else {

          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
  }
  openCreateAudioModal() {
    this.dialogService.open(SmsSettingModalComponent, {
      sidebarPosition: '',
      width: '590px',
      data: {

      },
      close: (data: any) => {
        this.pageIndex = 1;
        this.getEntityList();
        this.smsTemplateList(this.pageIndex, this.pageSize, '');
      }
    });
  }

  addsmsTempModal() {
    this.dialogService.open(AddNewSmsComponent, {
      sidebarPosition: '',
      width: '540px',
      data: {

      },
      close: (data: any) => {
        if (data == 'newId') {
          this.router.navigate(['/landing/services/refresh'])
        }
        else if (data == 'Success') {
          this.pageIndex = 1;
          this.smsTemplateList(this.pageIndex, this.pageSize, '');
        }

      }
    });
  }

  openSenderIdModal() {
    this.dialogService.open(SenderIdModalComponent, {
      sidebarPosition: '',
      width: '540px',
      data: {

      },
      close: (data: any) => {
        if (data) {
          this.pageIndex = 1;
          this.smsTemplateList(this.pageIndex, this.pageSize, '');
        }
      }
    });
  }

  openEntityIDModal() {
    this.dialogService.open(EntityModalComponent, {
      sidebarPosition: '',
      width: '590px',
      data: {

      },
      close: (data: any) => {
        if (data) {
          this.pageIndex = 1;
          this.getEntityList();
          this.smsTemplateList(this.pageIndex, this.pageSize, '');
        }
      }
    });
  }

  smsTemplateList(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      search: searchStr,
    };
    this.subscription = this.misscallService.smsTempValidaition(payload).subscribe(
      (res: any) => {
        if (res.result?.data?.length > 0) {
          //
          this.ELEMENT_DATA = res?.result?.data;
          this.total = res?.result?.count;
          this.dataSource = this.ELEMENT_DATA;

        }
        else {
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
      }, (error: any) => {
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
    this.smsTemplateList(event.pageIndex, event.pageSize, this.searchValue);
  }
  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.smsTemplateList(this.pageIndex, this.pageSize, this.searchValue);
  }
  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;
      switch (sort) {
        case 'senderId':
          return this.compare(
            a.senderId.toLowerCase(),
            b.senderId.toLowerCase(),
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
      this.smsTemplateList(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.smsTemplateList(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  openNewCampaign() {
    if (window.location.href.includes("sms-template-camp")) {
      this.router.navigate(['/landing/services/getting-sms']
        // { state: { CampFlag: '' }, },
      );
      this.jctser.startMenuChange.next(this.SMScampGettingStarted);
    } else {
      this.router.navigate(['/landing/services/getting-started']
        // { state: { CampFlag: '' }, },
      );
      this.jctser.startMenuChange.next(this.missedStarted);
    }

  }
}



