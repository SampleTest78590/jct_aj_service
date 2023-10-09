import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { ChooseSMSTemplateComponent } from '../choose-sms-template/choose-sms-template.component';
import { Subscription } from 'rxjs';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { SenderIdModalComponent } from '../sender-id-modal/sender-id-modal.component';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
@Component({
  selector: 'app-setup-feedack-sms',
  templateUrl: './setup-feedack-sms.component.html',
  styleUrls: ['./setup-feedack-sms.component.scss']
})
export class SetupFeedackSmsComponent implements OnInit {
  @Input() getstartData: any = '';
  @Input() gettingFlag: boolean = false;
  @Input() flagSMS: boolean = false;
  @Input() entityIdval: any = '';

  subscription: Subscription;
  // entityId:any;
  sendorIdList: any = [];
  selectedSendorId: string;
  smstempText: any = '';
  smsType: any = '';
  smstempId: any = "";
  SMSConfMissedNavigate: any = {
    subname: "sms-configuration",
    subroute: "/landing/services/sms-template"
  };
  SMSConfSMSNavigate: any = {
    subname: "sms-configuration-camp",
    subroute: "/landing/services/sms-template-camp"
  };
  constructor(private dialogRef: DialogService, private dialogRefSelf: DialogService,
    private misscallService: JctMisscallService,
    private smscampservice : JctSmsService,
    private router: Router, private route: ActivatedRoute, private jctservice: JctServicesService,
    public toastservice: ToastService) {

  }

  ngOnInit(): void {
    this.selectSenderID();
  }
  openChooseSmsTemp() {
    this.dialogRef.open(ChooseSMSTemplateComponent, {
      sidebarPosition: '',
      width: '540px',
      panelClass: 'rtl-dialog-box',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flag: true,
        entityid: this.entityIdval,
        senderId: this.selectedSendorId,
        gettingstarted: this.getstartData,
        alreadyselected: this.smstempText
      },

      close: (reason: any) => {
        if (reason) {
          this.smsType = reason.smsType;
          this.smstempText = reason.smsTemplateText;
          this.smstempId = reason.smsTemplateId;
          this.entityIdval = reason?.entityId;
        }
      }
    })
  }

  onCancel() {
    this.dialogRefSelf.close();
  }
  
  selectSenderID() {
    let payload = {
      "entityId": this.entityIdval,
    }

    this.subscription =
      this.misscallService.getSenderIdList(payload).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            resp?.result.forEach((element: any) => {
              this.sendorIdList.push({ label: element.senderId, value: element.senderId });

              if (this.getstartData?.feedbackSMS) {
                this.selectedSendorId = this.getstartData?.feedbackSMS?.senderId,
                  this.smstempText = this.getstartData?.feedbackSMS?.smsTemplateText,
                  this.smstempId = this.getstartData?.feedbackSMS?.smsTemplateId,
                  this.smsType = this.getstartData?.feedbackSMS?.smsType
              } else {

              }
            });
          } else {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
  }
  selectCategory(event: any) {
    this.smstempText = '';
    // this.getstartData?.feedbackSMS?.smsTemplateText = 'test'
    this.selectedSendorId = event?.label;
  }

  saveSetup() {
    this.flagSMS ? this.SMSMenuFlow() : this.missedCallflow();
  }
  missedCallflow() {
    let payload: any = {
      feedbackSMS: {
        "senderId": this.selectedSendorId,
        "smsTemplateId": this.smstempId,
        "smsTemplateText": this.smstempText,
        "entityId":this.entityIdval,
        "smsType":this.smsType
      }
    }
    //     if (this.gettingFlag) {
    payload.gettingStarted = this.gettingFlag;
    // }
    if (this.getstartData?.campaignData?.campaignId) {
      payload.campaignId = this.getstartData?.campaignData?.campaignId;
    }
    if (this.getstartData?.journeyId) {
      payload.journeyId = this.getstartData?.journeyId;
    }

    this.misscallService.createCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {

          this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
          this.dialogRefSelf.close(resp);

        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          // this.dialogRefSelf.close();
        }
      },
      (err) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        // this.dialogRefSelf.close();
      }
    )
  }
  SMSMenuFlow() {
      let payload: any = {
        "smsContent": {
          "senderId":this.selectedSendorId,
          "smsType": this.smsType,
          "smsTemplateId": this.smstempId,
          "smsTemplateText": this.smstempText,
          "entityId":this.entityIdval
      },
    }
    //     if (this.gettingFlag) {
          payload.gettingStarted = this.gettingFlag;
        // }
        if (this.getstartData?.campaignData?.campaignId) {
          payload.campaignId = this.getstartData?.campaignData?.campaignId;
        }
        if (this.getstartData?.journeyId) {
          payload.journeyId = this.getstartData?.journeyId;
        }

        this.smscampservice.createSmsCampaign(payload).subscribe(
          (resp: any) => {
            if (resp.status == 'Success') {

              this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
              this.dialogRefSelf.close(resp);

            } else {
              this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
              // this.dialogRefSelf.close();
            }
          },
          (err) => {
            this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
            // this.dialogRefSelf.close();
          }
        )
  }
  newsenderId(event: any) {
    this.dialogRefSelf.close();
    this.flagSMS ? this.jctservice.startMenuChange.next(this.SMSConfSMSNavigate) :
    this.jctservice.startMenuChange.next(this.SMSConfMissedNavigate);

    this.router.navigate(['/landing/services/refresh'])
    this.callpopup()
  }
  callpopup() {
    this.dialogRef.open(SenderIdModalComponent, {
      sidebarPosition: '',
      width: '540px',
      panelClass: 'rtl-dialog-box',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },

      close: (reason: any) => {
        if (reason == 'newId') {
          // this.jctservice.startMenuChange.next(this.SMSConfNavigate);
          this.flagSMS ? this.jctservice.startMenuChange.next(this.SMSConfSMSNavigate) :
          this.jctservice.startMenuChange.next(this.SMSConfMissedNavigate);
          
          this.flagSMS ? this.router.navigate(['/landing/services/sms-template-camp']):this.router.navigate(['/landing/services/sms-template'])
        }
        else {
          this.flagSMS ? this.router.navigate(['/landing/services/sms-template-camp']):this.router.navigate(['/landing/services/sms-template'])
        }
      },

    })

  }

}
