import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ConfirmationPopupComponent } from 'src/app/components/common/shared/custom-elements/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virtual-number-modal',
  templateUrl: './virtual-number-modal.component.html',
  styleUrls: ['./virtual-number-modal.component.scss'],
  host: { 'class': 'full-height' },
  encapsulation: ViewEncapsulation.None
})
export class VirtualNumberModalComponent implements OnInit {
  callerIdRadioSelect: any ={number:''};
  dataSourceOne: any;
  dataSourceTwo: any;
  callerData: any;
  callerDataClone: any = [];
  @Input() getstartData: any = '';
  @Input() gettingFlag: boolean = false;
  @Input() missedCallRoot: boolean = true;
  isDraftNumber: boolean = false;
  constructor(private dialogRefSelf: DialogService, private misscallservice: JctMisscallService,
    public createCamp: JctServicesService,
    private toastservice: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.createCamp.preKycFlag) this.getVirtualNumber();
    if (this.getstartData?.virtualNumber) {
      this.callerIdRadioSelect.number = this.getstartData?.virtualNumber
    }

  }

  onCancel() {
    this.dialogRefSelf.close();
  }
  getVirtualNumber() {
    let payload: any = {
      "draft_number":"A"
    };
    this.createCamp.getCallerId(payload).subscribe({
      next: (result: any) => {
        if (result?.status?.toLowerCase() === 'success') {
          this.callerData = result?.result?.filter((e: any) => !e.trial_number);
          this.callerDataClone = result?.result?.filter((e: any) => !e.trial_number);
          if (this.callerData.length > 0) {
            this.splitData(this.callerData);
          }
        } else {
          this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      error: (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    });
  }
  searchCallerId(event: any) {
    let searchdata: any = [...this.callerDataClone];
    searchdata = searchdata.filter((call: any) => call?.number.includes(event));
    this.splitData(searchdata);
  }

  splitData(array: any[]) {
    let middleIndex = Math.ceil(array.length / 2);
    this.dataSourceOne = array.splice(0, middleIndex);
    this.dataSourceTwo = array.splice(-middleIndex);
  }
  backtoscreen() {
    this.saveApiCall();
  }
  saveApiCall() {
    let payload: any = {
      "virtualNumber": this.callerIdRadioSelect?.number,
      "gettingStarted": this.gettingFlag
    }
    if (this.getstartData?.campaignData?.campaignId) {
      payload.campaignId = this.getstartData?.campaignData?.campaignId;
    }
    if (this.getstartData?.journeyId) {
      payload.journeyId = this.getstartData?.journeyId;
    }
    this.misscallservice.createCampaign(payload).subscribe(
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

        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }



  radioChange(event: any) {
    this.isDraftNumber = true;
    // this.callerIdRadioSelect = event?.number;
    if (event.draft_number === 'D') {
      this.dialogRefSelf.open(ConfirmationPopupComponent, {
        data: {
          header: 'Are you sure you want to use this number?',
          buttonText: 'Yes',
          cancelText: 'No',
          subheader: `Caution: If you proceed with using this number ${event.number}, previously started Service (currently in draft) will be discarded, and this number will be assigned to the current Service.`,
          type: event,
        },
        sidebarPosition: 'center',
        width: '500px',
        close: (data: any) => {
          if (data === 'success') {
            let payload = {
              'virtualNumber': event?.number
            }
            this.misscallservice.removeVnFromCampaign(payload).subscribe({
              next: (res: any) => {
                if (res?.status?.toLowerCase() === 'success') {
                  this.toastservice.showToast({ 'title': 'Number removed from in draft', 'kind': 'success' })
                } else {
                  this.toastservice.showToast({ 'title': res?.message, 'kind': 'error' });
                }
              },
              error: (err: any) => {
                this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' })
              }
            })
          }else{
            this.isDraftNumber = false;
          }
        }
      })
    }
  }
  redirectToVn() {
    this.onCancel();
    this.router.navigate(['landing/virtualNumber'],
      { state: { CampFlag: this.gettingFlag ? 'G' : 'P', CampId: this.getstartData?.campaignData?.campaignId, noRedirect: true, gettingStarted: this.gettingFlag, missedCallFlag: this.missedCallRoot, journeyId: this.getstartData?.journeyId }, },)

  }
}
