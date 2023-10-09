import { Component, HostListener, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { JctServicesService } from '../../../components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { KycServicePopupComponent } from 'src/app/modules/services-root/kyc-root/kyc-service-popup/kyc-service-popup.component'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class WelcomePageComponent implements OnInit {
  leadFlag: boolean = false;
  audioflag: boolean = false;
  leadData: any = [];
  audioData: any = [];
  campaignFlag: boolean = false;

  campaignData: any;
  campScheduleFlag: boolean = false;
  campScheduleData: any;
  onboardingDetails: any;
  panelOpenState: boolean = false;
  disableButton: boolean = false;
  disableButtonAudio: boolean = false;
  disableButtonCampaign: boolean = false;
  isopenCampaignModal = false;
  expandLeadList: boolean = true;
  expandAudioMessage: boolean = false;
  expandCampaignSchedule: boolean = false;
  uploadModalData: any = {};
  isOpenedTestCampaign = false;
  isopenCampaignScheduleModal = false;
  visible: Boolean = false;
  visibleLead: Boolean = false;
  allLeadDropDown: any;
  allAudioDropdown: any;
  LeadDropdown: any;
  AudioDropdown: any;
  preKycFlag: boolean = false;
  testCampDone: boolean = false;
  destinationNumberArray = [];
  contactNavigate: any = {
    subname: "contacts",
    subroute: "/landing/services/manage-contact"
  };
  audioNavigate: any = {
    subname: "audio-messages",
    subroute: "/landing/services/audio"
  };
  campaignNavigate: any = {
    subname: "Campaigns",
    subroute: "/landing/services/campaign-table"
  };;
  gettingStartNavigate: any = {
    subname: "getting-started",
    subroute: "/landing/services/welcome"
  };
  testCampaignData: any = [];
  subscription: Subscription;
  messageModal: boolean = false;
  messageHeader: any = '';
  messageSubheaderOne: any = '';
  mesasgeSubheaderTwo: any = '';
  msgIcon: any = '';
  @Output() closeModaldata: EventEmitter<any> = new EventEmitter<any>();
  createCampignData: any;
  constructor(
    public welcomservice: JctServicesService,
    private toastSer: ToastService,
    private router: Router,
    private dialogSer: DialogService
  ) { }

  ngOnInit(): void {
    this.preKycFlag = this.welcomservice.preKycFlag;
    this.getOnboarding(false,'','');
    if (window.history.state.CampFlag === 'O'){
      this.openNewCampaign();
      this.createCampignData = {
        campname: window.history.state.CampName,
        campdesc: window.history.state.CampDescription,
        campcateg: window.history.state.selectedcategory
      }
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.visibleLead = false;
    this.visible = false;
  }

  getOnboarding(actionflag:boolean, evt:any,modaltype:any) {
    let journeyId = this.welcomservice.journeyId
      ? this.welcomservice.journeyId
      : '';
    this.welcomservice.getOnboarding(journeyId).subscribe(
      (onboardDetails: any) => {
        this.preKycFlag = this.welcomservice.preKycFlag;
        if (onboardDetails.status == 'Success') {
          if (onboardDetails?.result) {
            this.preKycFlag = this.welcomservice.preKycFlag;
            this.onboardingDetails = onboardDetails?.result[0];
            this.welcomservice.stageValue = onboardDetails?.result[0]?.status;
            this.welcomservice.journeyId = this.onboardingDetails?.journeyId;
            this.welcomservice.startCountChange.next(
              this.onboardingDetails?.status
            );
            if (this.onboardingDetails?.leadListUpload?.length > 0) {
              this.leadFlag = true;
              this.leadData = this.onboardingDetails?.leadListUpload[0];
              this.welcomservice.startLeadData = this.leadData;
            }
            if (this.onboardingDetails?.audioUpload) {
              this.audioflag = true;
              this.audioData = this.onboardingDetails?.audioUpload;
              this.welcomservice.startAudioData = this.audioData;

            }
            if (this.onboardingDetails?.campaignCreation) {
             
              this.campaignFlag = true;
              this.campaignData = this.onboardingDetails?.campaignCreation;
              if (!this.campScheduleFlag) {
                this.campScheduleData =
                  this.onboardingDetails?.campaignCreation?.campaignSchedule;
              }

              this.welcomservice.NewCampaignData = this.campaignData;
              this.welcomservice.newCampflag = true;
              this.welcomservice.campaignID = '';
             
              if (this.campScheduleData) {
                this.campScheduleFlag = true;
              }
            }
            if(actionflag && this.onboardingDetails){
              this.navigateWelcome(evt,modaltype);
            }
          } else {
            this.welcomservice.startCountChange.next(0);
            if(actionflag){
              this.navigateWelcome(evt,modaltype);
            }
          }
        }
      },
      (error: any) => { }
    );
  }

  openUploadLeadList() {
    this.disableButton = true;
    
    this.uploadModalData = {
      flag: true,
      journeyId: this.welcomservice.journeyId,
      width: '540px'
    };

  }
  closeModal(event: any, modalType = '') {
    this.getOnboarding(true,event,modalType);
  }

  openUploadAudio() {
    this.disableButtonAudio = true;
    this.uploadModalData = {
      flag: true,
      journeyId: this.welcomservice.journeyId,
    };
    
    this.uploadModalData = {
      flag: true,
      journeyId: this.welcomservice.journeyId,
    };
  }

  openSetupModal() {
    this.isopenCampaignScheduleModal = !this.isopenCampaignScheduleModal;
    this.uploadModalData = {
      flag: true,
      journeyId: this.welcomservice.journeyId,
      campaignsScheduleData: {
        sDate: this.campScheduleData ? this.campScheduleData?.startDate : '',
        eDate: this.campScheduleData ? this.campScheduleData?.endDate : '',
        fTime: this.campScheduleData ? this.campScheduleData?.startTime : '',
        tTime: this.campScheduleData ? this.campScheduleData?.endTime : '',
        callRetry: this.campScheduleData
          ? this.campScheduleData?.callRetry
          : '',
        noOfRetries: this.campScheduleData
          ? this.campScheduleData?.noOfRetriesAllowed
          : '',
        dRetries: this.campScheduleData ? this.campScheduleData?.dRetries : '',
        duration: this.campScheduleData
          ? this.campScheduleData?.durationBetweenRetries
          : '',
        activeDays: this.campScheduleData
          ? this.campScheduleData?.activeDays
          : '',
        durationHrMnt: this.campScheduleData
          ? this.campScheduleData?.durationHrMnt
          : '',
      },
    };
    
  }

  openNewCampaign() {
    this.isopenCampaignModal = !this.isopenCampaignModal;
    
  }

  openTestCampaign() {
    
    let scheduleData: any = {
      activeDays: this.campScheduleData?.activeDays,
      callRetry: this.campScheduleData?.callRetry,
      dRetries: this.campScheduleData?.dRetries,
      duration: this.campScheduleData?.durationBetweenRetries,
      eDate: this.campScheduleData?.endDate,
      fTime: this.campScheduleData?.startTime,
      noOfRetries: this.campScheduleData?.noOfRetriesAllowed,
      sDate: this.campScheduleData?.startDate,
      tTime: this.campScheduleData?.endTime,
    };
    let obj: any = {
      CampaignName: this.campaignData,
      leadDetail: [this.leadData],
      audioDetail: [this.audioData],
      scheduledDetail: scheduleData,
      flag: true,
      journeyId: this.welcomservice.journeyId,
    };
    this.testCampaignData = [];
    this.testCampaignData.push(obj);
    if (this.preKycFlag) {
      this.isOpenedTestCampaign = !this.isOpenedTestCampaign;
    } else {
      this.preKycCallAPI();
    }
  }

  stop(event: any) {
    event.stopPropagation();
  }

  findAudioWelcome(audioId: any) {
    let baseSrc = {
      audioId: audioId,
    };
    this.welcomservice.getAudioData(baseSrc).subscribe((response: any) => {
      if (response.result.length == 1) {
        this.audioData.audioBinaryCode =
          'data:audio/mp3;base64,' +
          this.welcomeDecoder(response.result[0].audioFile.data);
      }
    });
  }

  welcomeDecoder(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  runCampaignNowOnboard() {
    if (this.preKycFlag) {
      this.runCampaignApicall();
    } else {
      this.dialogSer.open(KycServicePopupComponent, {
        data: {
          type: event,
        },
        sidebarPosition: 'center',
        width: '772px',
        close: (reason: any) => {
          if (reason) {
            if (reason === 'skip') {
              // skip KYC button press
              this.runCampaignApicall();
            }
            else {
              // proceed with KYC button press
              // this.dialogSer.close();
              this.router.navigateByUrl('/landing/settings/kyc');
              // this.dialogSer.close();
            }
          }
          else {
          }
        },
      });
    }
  }
  runCampaignApicall() {
    let payload: any = {
      campaignName: this.campaignData?.CampName,
      campaignDescription: this.campaignData?.CampDesc,
      campaignId: this.campaignData?.campaignID,
      campaignType: this.campaignData?.CampType,
      campaignCategory: this.campaignData ? this.campaignData?.campaignCategory : '',
      leadList: [
        {
          leadList: this.leadData?.leadId,
          leadListName: this.leadData?.leadName,
        },
      ],
      audioName: this.audioData?.audioName,
      audioId: this.audioData?.audioId,
      audioDescription: this.audioData?.audioDescription,
      audioDuration: this.audioData?.audioDuration,
      audioUrl: this.audioData?.audioUrl,
      // campaignStatus: 'schedule',
      gettingStarted: true,
      journeyId: this.welcomservice.journeyId,
      campaignSchedule: {
        startDate: this.campScheduleData?.startDate,
        endDate: this.campScheduleData?.endDate,
        activeDays: this.campScheduleData?.activeDays,
        startTime: this.campScheduleData?.startTime,
        endTime: this.campScheduleData?.endTime,
        retryFlag: this.campScheduleData?.callRetry,
        noOfRetriesAllowed: this.campScheduleData?.noOfRetriesAllowed,
        durationBetweenRetries: this.campScheduleData?.dRetries,
        callRetry: this.campScheduleData?.callRetry,
        durationHrMnt: this.campScheduleData?.durationHrMnt,
      },
    };

    if (this.campaignData?.CampType == 'Transactional') {
      payload.callerId = this.campaignData?.CallerId;
    }
    // this.subscriptonLst.push(
    this.welcomservice.runCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.getOnboarding(false,'','');
          this.welcomservice.NewCampaignData = {};
          this.welcomservice.campaignID = '';
          this.welcomservice.startCountChange.next(
            this.onboardingDetails?.status
          );
          this.toastSer.showToast({ 'title': resp?.message, 'kind': 'success' });
          this.welcomservice.startMenuChange.next(this.campaignNavigate);
        } else {
          this.toastSer.showToast({ 'title': resp?.message, 'kind': 'error' });
        }
      },
      (err: any) => {
        this.toastSer.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    );
  }
  saveAsDraftOnboard() {
    let payload: any = {
      campaignName: this.campaignData ? this.campaignData?.CampName || this.campaignData?.campaignName : '',
      campaignDescription: this.campaignData ? this.campaignData?.CampDesc || this.campaignData?.campaignDescription : '',
      campaignType: this.campaignData ? this.campaignData?.CampType || this.campaignData?.campaignType : '',
      campaignCategory: this.campaignData ? this.campaignData?.campaignCategory : '',
      campaignId: this.campaignData ? this.campaignData?.campaignId : '',
      leadList: [
        {
          leadId: this.leadData ? this.leadData?.leadId : '',
          leadName: this.leadData ? this.leadData?.leadName : '',
        },
      ],
      audioName: this.audioData ? this.audioData.audioName : '',
      audioId: this.audioData ? this.audioData.audioId : '',
      audioDescription: this.audioData ? this.audioData?.audioDescription : '',
      audioDuration: this.audioData ? this.audioData?.audioDuration : '',
      audioUrl: this.audioData ? this.audioData?.audioUrl : '',
      // campaignStatus: 'draft',
      gettingStarted: true,

    };
    if (this.campaignData && this.campaignData?.campaignID) {
      payload.campaignId = this.campaignData ? this.campaignData?.campaignID : ''
    }
    if (this.welcomservice.journeyId) {
      payload.journeyId = this.welcomservice.journeyId
    }
    if (this.campaignData?.CampType == 'Transactional') {
      payload.callerId = this.campaignData ? this.campaignData?.CallerId : '';
    }
    if (this.campScheduleData) {
      payload.campaignSchedule = {
        startDate: this.campScheduleData.startDate,
        endDate: this.campScheduleData.endDate,
        activeDays: this.campScheduleData.activeDays,
        startTime: this.campScheduleData.startTime,
        endTime: this.campScheduleData.endTime,
        retryFlag: this.campScheduleData.callRetry,
        noOfRetriesAllowed: this.campScheduleData.noOfRetriesAllowed,
        durationBetweenRetries: this.campScheduleData.dRetries,
        callRetry: this.campScheduleData.callRetry,
        durationHrMnt: this.campScheduleData.durationHrMnt,
      };
    }

    // this.subscriptonLst.push(
    this.welcomservice.saveAsDraftCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.getOnboarding(false,'','');
          this.welcomservice.NewCampaignData = {};
          this.welcomservice.campaignID = '';
          this.toastSer.showToast({ 'title': resp?.message, 'kind': 'success' });
          this.welcomservice.startMenuChange.next(this.campaignNavigate);
        } else {
          this.toastSer.showToast({ 'title': resp?.message, 'kind': 'error' });
        }
      },
      (err: any) => {
        this.toastSer.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    );
  }

  OnCancel() {
    this.welcomservice.startMenuChange.next(this.campaignNavigate);
  }

  deleteLeadList() {
    this.leadData = [];
    this.leadFlag = false;
    let flag = 0;
    this.deleteApicall(flag);
  }
  deleteAudio() {
    this.audioData = [];
    this.audioflag = false;
    let flag = 1;
    this.deleteApicall(flag);

  }
  clearData() {
    console.log("worked....!")
  }
  deleteApicall(flag: any) {

    let payload = {
      journeyId: this.welcomservice.journeyId,
      flag: flag
    };
    this.welcomservice.deleteLeadAudio(payload).subscribe((response: any) => {

      if (response.status == "Success") {
        this.getOnboarding(false,'','');
      }
    });
  }
  upploadListClose(event: any) {
    this.disableButton = false;
  }
  onclickLead() {
    this.visibleLead = !this.visibleLead;
    this.getLeadlist();
  }
  getLeadlist() {
    let payload: any = {};
    this.welcomservice.getLeadDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.LeadDropdown = result.result;
          this.allLeadDropDown = result.result;
        } else {
          this.toastSer.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        this.toastSer.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }
  navigateToContact() {
    this.welcomservice.subselectedItem = 'contacts';
    this.router.navigateByUrl('/landing/services/manage-contact');

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
    // let obj: any = {
    //   leadId: element.leadId,
    //   leadName: element.leadName,
    //   count:element.count
    // };
    this.leadData['leadId'] = element.leadId
    this.leadData['leadName'] = element.leadName
    this.leadData['count'] = element.count
    // this.leadData.push(obj);
    this.leadFlag = true;
    this.visibleLead = false;
  }
  SelectedAudio(element: any) {
    // let obj: any = {
    //   audioId: element.audioId,
    //   audioName: element.audioName,
    //   audioUrl: element?.audioUrl || '',
    // };
    // this.audioData.push(obj);
    this.visible = false;
    this.audioflag = true;
    this.audioData['audioId'] = element.audioId
    this.audioData['audioName'] = element.audioName
    this.audioData['audioUrl'] = element.audioUrl
  }
  onclick() {
    this.visible = !this.visible;
    this.getAudiolist();
  }
  getAudiolist() {
    let payload: any = {};

    this.welcomservice.getAudioDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.AudioDropdown = result.result;
          this.allAudioDropdown = result.result;
        } else {
          this.toastSer.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        this.toastSer.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }
  preKycCallAPI() {
    // let destinationNumberArray: any = [];
    let destinationNumberArrayTemp: any = [];
    // destinationNumberArray = [{ number: "9082961709", otp: '123456' }],
    this.destinationNumberArray.forEach((ele: any) => {
      destinationNumberArrayTemp.push('+91' + ele);
    });
    let payload = {
      "campaignName": this.campaignData?.CampName,
      "campaignDescription": this.campaignData?.CampDesc,
      "campaignType": this.campaignData?.CampType,
      "callerId": this.campaignData?.CallerId,
      "audioName": this.audioData[0]?.audioName,
      "audioId": this.audioData[0]?.audioId,
      "audioDescription": this.audioData[0]?.audioDescription,
      "audioUrl": this.audioData[0]?.audioUrl,
      "campaignSchedule": {
        "startDate": this.campScheduleData?.sDate,
        "endDate": this.campScheduleData?.eDate,
        "activeDays": [
          this.campScheduleData?.activeDays
        ],
        "startTime": this.campScheduleData?.fTime,
        "endTime": this.campScheduleData?.tTime,
        "retryFlag": this.campScheduleData?.callRetry,
        "noOfRetriesAllowed": this.campScheduleData?.noOfRetries,
        "durationBetweenRetries": this.campScheduleData?.dRetries,
        "durationHrMnt": this.campScheduleData?.durationHrMnt
      },
      "destinationNumbers": destinationNumberArrayTemp
    };
    this.subscription = this.welcomservice
      .testCampaign(payload)
      .subscribe((res: any) => {
        if (res?.status == 'Success') {
          this.testCampDone = true;
          this.msgIcon = 'success';
          this.messageHeader = 'Test campaign run successfully';
          this.messageSubheaderOne = 'Test campaign has been run successfully.';
          this.mesasgeSubheaderTwo = 'You can run campaign now';
          this.openTestCampaignModal();

        } else {
          this.msgIcon = 'error';
          this.messageHeader = 'Test campaign failed';
          this.messageSubheaderOne = 'Test campaign failed. Please check the entered number or retry again.';
          this.mesasgeSubheaderTwo = '';
          this.openTestCampaignModal();
          this.toastSer.showToast({ 'title': res.message, 'kind': 'error' });
        }
      }, (error: any) => {

        this.toastSer.showToast({ 'title': error.error.message, 'kind': 'error' });
      });
  }
  openTestCampaignModal() {
    this.messageModal = true;
  }
  closeSuccess() {
    this.messageModal = false;
    this.closeModaldata.emit(false);
  }
  editCampaign(type:any){
    let campInfoObj = {
      type : type,
      campaignData: this.campaignData,
      welcomeflag: true
    }
    // this.router.navigateByUrl('/landing/services/campaign');
    this.router.navigate(['/landing/services/campaign'],
    { state: { campInfo: campInfoObj }, },
  );
  }

  navigateWelcome(event:any,modalType:any){
    if (event) {

      if (modalType == 'uploadLead') {
      
        this.welcomservice.startMenuChange.next(this.contactNavigate);
      } else if (modalType == 'audio') {
        
        this.welcomservice.startMenuChange.next(this.audioNavigate);
      } else if (modalType == 'createCampaign') {

        this.campaignFlag = true;
        this.editCampaign('create');
       
        this.welcomservice.NewCampaignData = event.data;
        
        this.welcomservice.campaignID = '';
        
      } else if (modalType == 'campaignSchedule') {
        this.campScheduleData = {
          startDate: event.data.sDate,
          endDate: event.data.eDate,
          startTime: event.data.fTime,
          endTime: event.data.tTime,
          activeDays: event.data.activeDays,
          noOfRetriesAllowed: event.data.noOfRetries,
          durationBetweenRetries: event.data.duration,
          dRetries: event.data.dRetries,
          callRetry: event.data.callRetry,

        };
        this.destinationNumberArray = event.data?.destinationNumbers
        this.campScheduleFlag = true;
      }

    }
    this.disableButton = false;
    this.disableButtonAudio = false;
    this.isOpenedTestCampaign = false;
    this.isopenCampaignModal = false;
    this.isopenCampaignScheduleModal = false;
    this.uploadModalData = {};
  }
}
