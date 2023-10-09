import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { NameCampaignModalComponent } from './name-campaign-modal/name-campaign-modal.component';
import { SetupFeedackSmsComponent } from './setup-feedack-sms/setup-feedack-sms.component';
import { VirtualNumberModalComponent } from './virtual-number-modal/virtual-number-modal.component';
import { LeadListActionComponent } from './lead-list-action/lead-list-action.component';
import { PlusAudioModalComponent } from './plus-audio-modal/plus-audio-modal.component';
import { SmsConfigurePopupComponent } from './sms-template-landing/sms-configure-popup/sms-configure-popup.component';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { Router } from '@angular/router';
import { ConfirmationPopupComponent } from 'src/app/components/common/shared/custom-elements/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-missed-call-root',
  templateUrl: './missed-call-root.component.html',
  styleUrls: ['./missed-call-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class MissedCallRootComponent implements OnInit {
  readMorecamp: boolean = false;
  readMoreTextcamp = 'Read More';
  readMoreSMS: boolean = false;
  readMoreTextSMS = 'Read More';
  noConfigFlag: boolean = false;
  openAudioModal: boolean = false;
  actionFlag: any;
  gettingStartedData: any;
  gettingStartedFlag: boolean = false;
  campidpreview: any;
  entityid: any;
  moreCamp: boolean = false;
  moreText: boolean = false;
  SMSConfNavigate: any = {
    subname: "sms-configuration",
    subroute: "/landing/services/sms-template"
  };
  missCallMangNavigate: any = {
    subname: "Missed-call",
    subroute: "/landing/services/missed-call-mgn"
  };
  submittedFlag: boolean = false;// disable arrows not to allow for editting
  constructor(private dialogSer: DialogService,
    private misscallservice: JctMisscallService, private router: Router,
    private toastservice: ToastService, public createCamp: JctServicesService,) { }

  ngOnInit(): void {
    this.actionFlag = window.history.state?.CampFlag;
    this.campidpreview = window.history.state?.CampId;
    let journeyid = '';
    this.gettingStartedData = [];
    if (!this.actionFlag || this.actionFlag === 'G') {
      this.gettingStartedFlag = true;
      this.getGettingStartedApi(journeyid)
    }
    if (this.actionFlag === 'P') {
      this.previewApicall(this.campidpreview);
    }

  }
  previewApicall(campid: any) {
    this.gettingStartedData = [];
    let payload = {
      "campaignId": campid
    }
    this.misscallservice.previewCamp(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.gettingStartedData = result?.result[0];
          this.readMoreTextSMS = 'Read More';
          this.readMoreSMS = false;
          this.readMoreTextcamp = 'Read More';
          this.readMorecamp = false;
          if (this.gettingStartedData) {
            if (this.gettingStartedData?.isGettingStarted) {
              this.gettingStartedFlag = true;
              let journeyid = '';
              this.getGettingStartedApi(journeyid)
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
            if (this.gettingStartedData?.status) {
              this.submittedFlag = this.gettingStartedData?.status === 'submitted' ? true : false;
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
  openSetup() {
    let dialogRefAudio = this.dialogSer.open(SetupFeedackSmsComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flagSMS: false,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
        entityIdval: this.entityid
      },
      close: (reason: any) => {
        if (reason) {
          // smstempText
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewApicall(this.campidpreview);
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
        flagSMS: false,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
      },

      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewApicall(this.campidpreview);
          }
        }
      }

    });

  }

  openVirtualNumbers() {
    let dialogRefAudio = this.dialogSer.open(VirtualNumberModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flag: true,
        gettingFlag: this.gettingStartedFlag,
        getstartData: this.gettingStartedData,
        missedCallRoot: true
      },
      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            if (this.campidpreview) {
              this.previewApicall(this.campidpreview);
            }

          }
        }
      }
    });

  }

  leadlistAction() {
    let dialogRefAudio = this.dialogSer.open(LeadListActionComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flag: true,
        getstartData: this.gettingStartedData,
        gettingFlag: this.gettingStartedFlag
      },

      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewApicall(this.campidpreview);
          }

          // call api to refresh page
        }
      }
    });
  }
  smsConfigure() {
    this.smsCofValidation();
  }

  openPlusAudio() {
    // this.openAudioModal = !this.openAudioModal;
    let dialogRefAudio = this.dialogSer.open(PlusAudioModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      data: {
        flag: true,
        getstartData: this.gettingStartedData,
        gettingFlag: this.gettingStartedFlag
      },
      close: (reason: any) => {
        if (reason) {
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            if (reason?.campaignId) {
              this.campidpreview = reason?.campaignId;
            }
            this.previewApicall(this.campidpreview);
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
  getGettingStartedApi(journeyid: any) {
    this.gettingStartedData = [];
    this.misscallservice.getOnboardingDetail(journeyid).subscribe(
      (result: any) => {
        if (result.status === 'Success' && result?.result) {
          this.gettingStartedData = result?.result[0];
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

            if (this.gettingStartedData?.status) {
              this.submittedFlag = this.gettingStartedData?.status === 'submitted' ? true : false;
            }
          }
        } else {
          // this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        // this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
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
          this.createCamp.startMenuChange.next(this.SMSConfNavigate);
          this.router.navigate(['/landing/services/sms-template'],
            { state: { welcomeSms: true }, },
          );
          // this.dialogSer.close();
        }
      },
    })

  }

  discardClick() {

    this.dialogSer.open(ConfirmationPopupComponent, {
      data: {
        header: 'Do you want to Discard Campaign?',
        buttonText: 'Yes',
        cancelText: 'No',
        subheader: 'If you discard campaign, all your entered information will be removed',
        type: event,
      },
      sidebarPosition: 'center',
      width: '584px',
      close: (data: any) => {
        if (data) {
          let payload: any = {
            "campaignId": this.gettingStartedData?.campaignData?.campaignId
          };
          this.misscallservice.discardApi(payload).subscribe(
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
    this.misscallservice.submitService(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {

          this.toastservice.showToast({ 'title': resp.result, 'kind': 'success' });
          this.backToMain();
        } else {
          this.toastservice.showToast({ 'title': resp.result, 'kind': 'error' });
        }
      },
      (err) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }
  backToMain() {
    this.createCamp.startMenuChange.next(this.missCallMangNavigate);
    this.router.navigate(['/landing/services/missed-call-mgn']);
  }
  deleteAudio() {
    this.saveAudioDetail();
  }
  saveAudioDetail() {
    let payload: any = {
      "audioData": {
      }
    }
    payload.gettingStarted = this.gettingStartedFlag;

    if (this.gettingStartedData?.campaignData?.campaignId) {
      payload.campaignId = this.gettingStartedData?.campaignData?.campaignId;
    }
    if (this.gettingStartedData?.journeyId) {
      payload.journeyId = this.gettingStartedData?.journeyId;
    }

    this.misscallservice.createCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          if (this.gettingStartedFlag) {
            this.getGettingStartedApi('');
          }
          else {
            this.previewApicall(this.campidpreview);
          }
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
        }
      },
      (err) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        // this.dialogRefSelf.close();
      }
    )
  }
}
