import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { UploadLeadListSmsComponent } from '../upload-lead-list-sms/upload-lead-list-sms.component';

@Component({
  selector: 'app-choose-sms-lead-list',
  templateUrl: './choose-sms-lead-list.component.html',
  styleUrls: ['./choose-sms-lead-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseSmsLeadListComponent implements OnInit {
  radioSelected: any = '1';
  leadDetail: any = [];
  visibleLead: Boolean = false;
  LeadDropdown: any;
  allLeadDropDown: any;
  isCapmaignCreateOpen: boolean = false;
  @Input() getstartData: any = '';
  @Input() flagSMS: boolean = false;
  @Input() gettingFlag: boolean = false;

  constructor(private dialogRefSelf: DialogService, private setCamp: JctServicesService, private dialogSer: DialogService,
    private smsService: JctSmsService,
    private toastservice: ToastService) { }

  ngOnInit(): void {
    // preview data
    if(this.getstartData?.leadList)
    {
      this.leadDetail.push(this.getstartData?.leadList);
    }
    if(this.getstartData?.smsContentType?.type){
      this.radioSelected = this.getstartData?.smsContentType?.type == "customized" ? '2': '1' ;
    }
    
  }
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.visibleLead = false;
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    this.visibleLead = false;
  }

  onclickLead() {
    this.visibleLead = !this.visibleLead;
    this.getLeadlist();
  }
  getLeadlist() {
    this.leadDetail = [];
    this.LeadDropdown = [];
    let payload: any = {};
    this.setCamp.getLeadDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {

          this.LeadDropdown = result.result;
          this.allLeadDropDown = result.result;
          if (this.radioSelected == '2') {
            this.LeadDropdown = this.LeadDropdown.filter((item: any) => item.count !== '0');
            this.allLeadDropDown = this.allLeadDropDown.filter((item: any) => item.count !== '0');
          }

        } else {
          this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });

        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }
 
  openCreateLeadModal() {
    this.isCapmaignCreateOpen = !this.isCapmaignCreateOpen;
  }

  closeModal(event: any, type = '') {
    this.isCapmaignCreateOpen = false;
    if (event) {
      if (type == 'uploadLead') {
        let obj: any = {
          leadId: event.leadId,
          leadName: event.leadName,
          count: event.count
        };
        this.leadDetail.push(obj);
      }
    }
  }
  onSearch(event: any, arrayName: any) {
    if (arrayName === 'LeadDropdown') {
      this.LeadDropdown = this.onSearchFilter(
        event,
        this.allLeadDropDown,
        'leadName'
      );
    } else {
    }
  }

  onSearchFilter(event: any, list: any, findingObj: any) {
    let filteredItem: any = [];
    const filterValue = event.toLowerCase();

    if (filterValue.length > 0) {
      filteredItem = list.filter(
        (option: any) =>
          option[findingObj].toLowerCase().indexOf(filterValue) >= 0
      );
    } else {
      filteredItem = list;
    }
    return filteredItem;
  }
  Selectedlead(element: any) {
    let obj: any = {
      leadId: element.leadId,
      leadName: element.leadName,
      count: element.count
    };
    this.leadDetail.push(obj);
    this.visibleLead = false;
  }
  deleteLeadList(item: any) {
    this.leadDetail = [];
  }
  onCancel() {
    this.dialogRefSelf.close();
  }
  valuechange() {
    this.leadDetail = [];
  }
  saveDetail() {
    var selected = this.radioSelected === '1' ? 'static' : 'customized';
    let payload: any;
    if(this.getstartData?.campaignSchedule?.campaignType == 'ondemand'){
       payload = {
        smsContentType:{
        type: selected,
      }
    };
    }else{
      payload = {
        smsContentType:{
        type: selected,
      },
      leadList: {
        leadId: this.leadDetail[0]?.leadId,
        leadName: this.leadDetail[0]?.leadName,
        count: this.leadDetail[0]?.count
      },
    };
    }

    if(this.gettingFlag){
      payload.gettingStarted = this.gettingFlag;
    }

     if (this.getstartData?.campaignData?.campaignId) {
       payload.campaignId = this.getstartData?.campaignData?.campaignId;
     }
     if (this.getstartData?.journeyId) {
       payload.journeyId = this.getstartData?.journeyId;
     }
    this.smsService.createSmsCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {

          this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
          this.dialogRefSelf.close(resp);
        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          this.dialogRefSelf.close();
        }
      },
      (err) => {
        this.dialogRefSelf.close();
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }
  openCustomLeadList() {
    let dialogRefAudio = this.dialogSer.open(UploadLeadListSmsComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        //  flagSMS: true,
        //  gettingFlag: this.gettingStartedFlag,
        //  getstartData: this.gettingStartedData,
      },

      close: (reason: any) => {
         if (reason) {
          let obj: any = {
            leadId: reason?.leadId,
            leadName: reason?.leadName,
            count: ''
          };
          this.leadDetail.push(obj);
        }
      }
    }

    );
  }

  calHeight(listLength: number): string {
    if(listLength>4){
      return '200px'
    }else{
      return listLength*40+'px'
    }
  }

  disableSave(){
    if(this.getstartData?.campaignSchedule?.campaignType == 'ondemand'){
      return false;
    }else{
      return !(this.leadDetail.length > 0 && this.radioSelected)
    }
  }
}