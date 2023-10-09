import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { ChooseSmsLeadListComponent } from './choose-sms-lead-list/choose-sms-lead-list.component';
import { SetupSmsCampModalComponent } from './setup-sms-camp-modal/setup-sms-camp-modal.component';
import { NameCampaignModalComponent } from '../missed-call-root/name-campaign-modal/name-campaign-modal.component';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { SmsConfigurePopupComponent } from '../missed-call-root/sms-template-landing/sms-configure-popup/sms-configure-popup.component';
import { SetupFeedackSmsComponent } from '../missed-call-root/setup-feedack-sms/setup-feedack-sms.component';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ConfirmationPopupComponent } from 'src/app/components/common/shared/custom-elements/confirmation-popup/confirmation-popup.component';
import * as moment from 'moment';
import { SMSTestCampaignComponent } from './test-campaign-modal/test-campaign-modal.component';
@Component({
  selector: 'app-sms-camp-root',
  templateUrl: './sms-camp-root.component.html',
  styleUrls: ['./sms-camp-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class SmsCampRootComponent implements OnInit {
  actionFlag: any;
  gettingStartedData: any;
  gettingStartedFlag: boolean = false;
  submittedFlag: boolean = false;// disable arrows not to allow for editting
  moreCamp: boolean = false;
  moreText: boolean = false;
  readMorecamp: boolean = false;
  readMoreTextcamp = 'Read More';
  readMoreSMS: boolean = false;
  readMoreTextSMS = 'Read More';
  entityid: any;
  campidpreview: any;
  noConfigFlag: boolean = false;
  activedaysformat: any;
  demandflag: boolean = false;
  formatedStartTime: any;
  formatedEndTime: any;
  SMSConfcampNavigate: any = {
    subname: "sms-configuration-camp",
    subroute: "/landing/services/sms-template-camp"
  };
  smsCampMangNavigate: any = {
    subname: "sms-list",
    subroute: "/landing/services/sms-management"
  };
  constructor(private dialogSer: DialogService, private misscallservice: JctMisscallService,
    private smscampservice: JctSmsService,
    private router: Router, private toastservice: ToastService, public createCamp: JctServicesService) { }

  ngOnInit(): void {
    this.actionFlag = window.history.state?.CampFlag;
    this.campidpreview = window.history.state?.CampId;
    let journeyid = '';
    this.gettingStartedData = [];
    if (!this.actionFlag) {
      this.gettingStartedFlag = true;
      this.getGettingStartedSMSApi(journeyid);
    }
    if (this.actionFlag === 'P') {
      this.previewSMSCampApicall(this.campidpreview);
    }
  }

  openChoosesmsLeaDList() {
    let dialogRefAudio = this.dialogSer.open(ChooseSmsLeadListComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flagSMS: true,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
      },
      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedSMSApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewSMSCampApicall(this.campidpreview);
          }
        }
      }
    });
  }

  openSetupSmsCamp() {
    let dialogRefAudio = this.dialogSer.open(SetupSmsCampModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flagSMS: true,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
      },
      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedSMSApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewSMSCampApicall(this.campidpreview);
          }
        }
      }
      
    });
  }

  openNameCampaign() {
    let dialogRefAudio = this.dialogSer.open(NameCampaignModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flagSMS: true,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
      },

      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedSMSApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewSMSCampApicall(this.campidpreview);
          }
        }
      }

    });

  }
  readMoreClick() {
    if (this.readMoreTextcamp === 'Read Less') {
      this.readMorecamp = false;
      this.readMoreTextcamp = 'Read Less' ? 'Read More' : '';
    } else {
      this.readMorecamp = true;
      this.readMoreTextcamp = 'Read More' ? 'Read Less' : '';

    }
  }
  readMoreSMSClick() {
    if (this.readMoreTextSMS === 'Read Less') {
      this.readMoreSMS = false;
      this.readMoreTextSMS = 'Read Less' ? 'Read More' : '';
    } else {
      this.readMoreSMS = true;
      this.readMoreTextSMS = 'Read More' ? 'Read Less' : '';
    }
  }
  smsConfigure() {
    this.smsCofValidation();
  }
  smsCofValidation() {
    this.misscallservice.getEntityId().subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.entityid = result?.result[0].entityId
          this.openSetup();
          // this.configPop();
        } else {
          this.noConfigFlag = true;
          this.configPop();

        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }
  configPop() {

    this.dialogSer.open(SmsConfigurePopupComponent, {
      data: {
        header: 'Configure your SMS settings',
        subheader: 'To Add Feedback SMS, You need to enter DLT approved Entity ID, Sender ID(s) & SMS Template(s).',

        buttonText: 'Configure now',

        type: event,
      },
      sidebarPosition: 'center',
      width: '384px',
      close: (data: any) => {
        if (data) {
          this.createCamp.startMenuChange.next(this.SMSConfcampNavigate);
          this.router.navigate(['/landing/services/sms-template-camp'],
            { state: { welcomeSms: true }, },
          );
          // this.dialogSer.close();
        }
      },
    })

  }
  openSetup() {
    let dialogRefAudio = this.dialogSer.open(SetupFeedackSmsComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flagSMS: true,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
        entityIdval: this.entityid
      },
      close: (reason: any) => {
        if (reason) {
          // smstempText
          if (this.gettingStartedFlag) {
            this.getGettingStartedSMSApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewSMSCampApicall(this.campidpreview);
          }
        }
      }
    });

  }
  backToMain() {
    this.createCamp.startMenuChange.next(this.smsCampMangNavigate);
    this.router.navigate(['/landing/services/sms-management'])
  }

  getGettingStartedSMSApi(journeyid: any) {
    this.gettingStartedData = [];
    this.smscampservice.getOnboardingSMSCampDetail(journeyid).subscribe(
      (result: any) => {
        if (result.status === 'Success' && result?.result) {
          this.gettingStartedData = result?.result;
          this.readMoreTextSMS = 'Read More';
          this.readMoreSMS = false;
          this.readMoreTextcamp = 'Read More';
          this.readMorecamp = false;
          if (this.gettingStartedData) {
            if (this.gettingStartedData?.campaignData?.campaignDescription?.length < 80) {
              this.moreCamp = false;
            } else {
              this.moreCamp = true;
            }
            let breaklineFlag = (this.gettingStartedData?.feedbackSMS?.smsTemplateText.match(/\n/g))?.length > 0 ? true : false;
            if (this.gettingStartedData?.feedbackSMS && this.gettingStartedData?.feedbackSMS?.smsTemplateText?.length < 90) {
              this.moreText = false;
            } else {
              this.moreText = true;
            }
            if (breaklineFlag) {
              this.moreText = true;
            }

            if (this.gettingStartedData?.campaignStatus) {
              this.submittedFlag = this.gettingStartedData?.campaignStatus === 'DRAFT' ? false : true;
            }
            if (this.gettingStartedData?.campaignSchedule) {
              if (this.gettingStartedData?.campaignSchedule?.campaignType === 'ondemand') {
                this.demandflag = true;
              } else {
                this.demandflag = false;
              }
              this.formatedStartTime = moment(this.gettingStartedData?.campaignSchedule.startTime, ["HH.mm"]).format("hh:mm A"),
                this.formatedEndTime = moment(this.gettingStartedData?.campaignSchedule.endTime, ["HH.mm"]).format("hh:mm A"),
                this.activedaysformat = this.gettingStartedData?.campaignSchedule?.activeDays.map((string: any) => string.slice(0, 3))
            }

          }
        } else {

        }
      },
      (error) => {

      }
    );
  }
  previewSMSCampApicall(campid: any) {
    this.gettingStartedData = [];
    let payload = {
      "campaignId": campid
    }
    this.smscampservice.previewCampSMSCamp(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.gettingStartedData = result?.result;
          this.readMoreTextSMS = 'Read More';
          this.readMoreSMS = false;
          this.readMoreTextcamp = 'Read More';
          this.readMorecamp = false;
          if (this.gettingStartedData) {
            if (this.gettingStartedData?.isGettingStarted) {
              this.gettingStartedFlag = true;
              let journeyid = '';
              this.getGettingStartedSMSApi(journeyid)
            } else {
              this.gettingStartedFlag = false;
            }
            if (this.gettingStartedData?.campaignData?.campaignDescription?.length < 80) {
              this.moreCamp = false;
            } else {
              this.moreCamp = true;
            }
            let breaklineFlag = (this.gettingStartedData?.feedbackSMS?.smsTemplateText.match(/\n/g))?.length > 0 ? true : false;
            if (this.gettingStartedData?.feedbackSMS && this.gettingStartedData?.feedbackSMS?.smsTemplateText?.length < 118) {
              this.moreText = false;
            } else {
              this.moreText = true;
            }
            if (breaklineFlag) {
              this.moreText = true;
            }
            if (this.gettingStartedData?.campaignStatus) {
              this.submittedFlag = this.gettingStartedData?.campaignStatus === 'DRAFT' ? false : true;
            }
            if (this.gettingStartedData?.campaignSchedule) {
              if (this.gettingStartedData?.campaignSchedule?.campaignType === 'ondemand') {
                this.demandflag = true;
              } else {
                this.demandflag = false;
              }
              this.formatedStartTime = moment(this.gettingStartedData?.campaignSchedule.startTime, ["HH.mm"]).format("hh:mm A"),
                this.formatedEndTime = moment(this.gettingStartedData?.campaignSchedule.endTime, ["HH.mm"]).format("hh:mm A"),
                this.activedaysformat = this.gettingStartedData?.campaignSchedule?.activeDays?.map((string: any) => string.slice(0, 3))
            }
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

  discardClick() {
    this.dialogSer.open(ConfirmationPopupComponent, {
      data: {
        header: 'Do you want to Discard SMS Campaign?',
        buttonText: 'Yes',
        cancelText: 'No',
        subheader: 'If you discard SMS campaign, all your entered information will be removed',
        type: event,
      },
      sidebarPosition: 'center',
      width: '584px',
      close: (data: any) => {
        if (data) {
          let payload: any = {
            "campaignId": this.gettingStartedData?.campaignData?.campaignId
          };
          this.smscampservice.discardSMSApi(payload).subscribe(
            (result: any) => {
              if (result.status === 'Success') {
                this.toastservice.showToast({ 'title': result.result, 'kind': 'success' });
                this.backToMain();

              } else {
                this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
              }
            }, (error: any) => {
              this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
            })
        }
      }
    });


  }
  submitClick() {
    let payload: any = {
      "campaignId": this.gettingStartedData?.campaignData?.campaignId,
    }
    this.smscampservice.submitSMSCampService(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {

          this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
          this.backToMain();
        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
        }
      },
      (err) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }
  saveAsDraft() {
    this.backToMain();
  }

  OpentestCampaign() {
    this.dialogSer.open(SMSTestCampaignComponent, {
      data: {
        gettingStartedObj: this.gettingStartedData,
      }
    })

  }

  checkValidity() {
    return !(['CREATED', 'DRAFT'].includes(this.gettingStartedData?.campaignStatus) && 'campaignData' in this.gettingStartedData && 'campaignSchedule' in this.gettingStartedData && 'feedbackSMS' in this.gettingStartedData)
  }
}
