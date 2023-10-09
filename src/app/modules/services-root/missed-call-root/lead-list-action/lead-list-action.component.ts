import { Component,HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { CreateNewLeadListComponent } from './create-new-lead-list/create-new-lead-list.component';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';

@Component({
  selector: 'app-lead-list-action',
  templateUrl: './lead-list-action.component.html',
  styleUrls: ['./lead-list-action.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LeadListActionComponent implements OnInit {
  // abc = "test"
  radioSelected: any = '1';
  visibleLead: Boolean = false;
  AudioDropdown: any;
  allAudioDropdown: any;
  LeadDropdown: any;
  allLeadDropDown: any;
  leadDetail: any = [];
  @Input() getstartData: any = '';
  @Input() gettingFlag: boolean = false;
  constructor(private dialogRefSelf: DialogService, private setCamp: JctServicesService,
    private missedcall:JctMisscallService,
   private toastservice: ToastService) { }

  ngOnInit(): void {
    if(this.getstartData?.leadAction)
    {
      this.radioSelected = this.getstartData?.leadAction === 'A'? '1':'2';
    }
    if(this.getstartData?.leadListUpload)
    {
      this.leadDetail.push(this.getstartData?.leadListUpload);
    }
  }
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.visibleLead = false;
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    this.visibleLead = false;
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
          if(this.radioSelected == '2')
          {
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
  onCancel() {
    this.dialogRefSelf.close();
  }
  onclickLead() {
    this.visibleLead = !this.visibleLead;
    this.getLeadlist();
  }
  newleadList(){
     this.dialogRefSelf.open(CreateNewLeadListComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      close: (reason: any) => {
        if (reason?.leadName) {
          let obj: any = {
            leadId: reason.leadId,
            leadName: reason.leadName,
            leadDesc: reason.leadDescription,
            count: '0'
          };
          this.leadDetail.push(obj);
          this.visibleLead = false;
        }
        
      }
    });
  }
  onSearch(event: any, arrayName: any) {
    if (arrayName === 'LeadDropdown') {
      this.LeadDropdown = this.onSearchFilter(
        event,
        this.allLeadDropDown,
        'leadName'
      );
    } else {
      this.AudioDropdown = this.onSearchFilter(
        event,
        this.allAudioDropdown,
        'audioName'
      );
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
    // this.leadDetail.splice(this.leadDetail.indexOf(item['leadId']), 1);
    this.leadDetail = [];
  }
  saveDetail(){
   var selected = this.radioSelected === '1'? 'A':'D';
    let payload:any ={
    leadList: {
      leadId: this.leadDetail[0].leadId,
      leadName: this.leadDetail[0].leadName,
      count: this.leadDetail[0].count
    },
    leadAction: selected,
    "gettingStarted" : this.gettingFlag
    };

    // if(this.gettingFlag){
    //   payload.gettingStarted = this.gettingFlag;
    // }

    if (this.getstartData?.campaignData?.campaignId) {
      payload.campaignId = this.getstartData?.campaignData?.campaignId;
    }
    if (this.getstartData?.journeyId) {
      payload.journeyId = this.getstartData?.journeyId;
    }
    this.missedcall.createCampaign(payload).subscribe(
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
  valuechange(){
    this.leadDetail = [];
  }

  calHeight(listLength: number): string {
    if(listLength>4){
      return '200px'
    }else{
      return listLength*40+'px'
    }
  }
}
