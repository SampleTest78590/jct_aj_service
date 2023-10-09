import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-name-campaign-modal',
  templateUrl: './name-campaign-modal.component.html',
  styleUrls: ['./name-campaign-modal.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NameCampaignModalComponent implements OnInit {
  CampName:any;
  CampDes:any;
  
  @Input() getstartData: any = '';
  @Input() flagSMS: boolean = false;
  @Input() gettingFlag: boolean = false;
  constructor(private dialogRefSelf: DialogService,
     private createCamp: JctServicesService,
     private misscall:JctMisscallService,
     private smscampservice : JctSmsService,
     private toastservice: ToastService) { }

  ngOnInit(): void {
    if(this.getstartData?.campaignData)
    {
      this.CampName = this.getstartData?.campaignData?.campaignName,
      this.CampDes = this.getstartData?.campaignData?.campaignDescription
    }
  }

  onCancel() {
    this.dialogRefSelf.close();
    //this.closeModal.emit(false);
  }
  validateCharNum(evt: any) {
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (
      (charCode >= 48 && charCode !== 64 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 32
    ) {
      return true;
    } else {
      return false;
    }
  }

saveCampaign(){
  if(this.flagSMS)
  {
    this.SMSPopCampSave();
  }else{
    this.missedCallPopSave();
  }
}
missedCallPopSave(){
  let payload: any = {
    "campaignName": this.CampName,
    "campaignDescription": this.CampDes,
   "gettingStarted": this.gettingFlag
  }
  // if(this.gettingFlag){
  //   payload.gettingStarted = this.gettingFlag;
  // }
  if(this.getstartData?.campaignData?.campaignId)
  {
    payload.campaignId = this.getstartData?.campaignData?.campaignId;
  }
  if(this.getstartData?.journeyId)
  {
    payload.journeyId = this.getstartData?.journeyId;
  }
    
    
  this.misscall.createCampaign(payload).subscribe(
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
SMSPopCampSave(){
  let payload: any = {
    "campaignName": this.CampName,
    "campaignDescription": this.CampDes,
    "gettingStarted": this.gettingFlag
  }
  // if(this.gettingFlag){
  //   payload.gettingStarted = this.gettingFlag;
  // }
  if(this.getstartData?.campaignData?.campaignId)
  {
    payload.campaignId = this.getstartData?.campaignData?.campaignId;
  }
  if(this.getstartData?.journeyId)
  {
    payload.journeyId = this.getstartData?.journeyId;
  }
    
    
  this.smscampservice.createSmsCampaign(payload).subscribe(
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
autogrowtextArea() {
  let textArea = document.getElementById("camptextarea"); 
  this.createCamp.autogrowtextArea(textArea);
}
}
