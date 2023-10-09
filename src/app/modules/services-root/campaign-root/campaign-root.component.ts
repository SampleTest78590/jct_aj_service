import { Component, HostListener, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { KycServicePopupComponent } from 'src/app/modules/services-root/kyc-root/kyc-service-popup/kyc-service-popup.component'
import * as moment from 'moment';
import { ConfirmationPopupComponent } from 'src/app/components/common/shared/custom-elements/confirmation-popup/confirmation-popup.component';


@Component({
  selector: 'app-campaign-root',
  templateUrl: './campaign-root.component.html',
  styleUrls: ['./campaign-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'full-height' }
})
export class CampaignRootComponent implements OnInit {
  breadcrumbJson: any = [
    {
      label: 'Campaigns',
      link: '/landing/services/campaign-table',
    },
    {
      label: 'Create New Campaign',
      link: '/landing/services/campaign',
    },
  ];
  expandLeadList: boolean = true;
  expandAudioList: boolean = false;
  expandScheduleList: boolean = false;
  visible: Boolean = false;
  visibleLead: Boolean = false;

  CampaignData: any;
  subscriptonLst: Subscription[] = [];
  campaignscheduleData: any;
  setupflag: boolean = false;
  LeadDropdown: any;
  AudioDropdown: any;
  leadDetail: any = [];
  audioDetail: any = [];
  campaigntestData: any = [];
  editCampdetail: any;
  editCampId: any;
  preKycFlag: boolean;
  testcampbuttonflag: boolean = true;
  welcomeflag: boolean = false;
  @Input() isWelcome: boolean = false;
  @Output() closeModaldata: EventEmitter<any> = new EventEmitter<any>();
  counterRoot: number = 0;
  audioId: any;
  allLeadDropDown: any;
  allAudioDropdown: any;
  searchList: any = '';
  audioSearch: any = '';
  isopenCampaignModal = false;
  isopenCampaignCreateModal = false;
  isCapmaignCreateOpen: boolean = false;
  openAudioModal: boolean = false;
  isTestCampaignModalModal = false;
  subscription: Subscription;
  messageModal: boolean = false;
  messageHeader: any = '';
  messageSubheaderOne: any = '';
  mesasgeSubheaderTwo: any = '';
  gettingstartedData: any;
  msgIcon: any = '';
  testedCamp:boolean = false;
  selectedNumbers:any = [];
  firstCamp:boolean = false;
  constructor(
    private router: Router,
    private setCamp: JctServicesService,
    private toastservice: ToastService,
    private dialogSer: DialogService
  ) { }

  ngOnInit(): void {
    this.gettingstartedData = window.history.state?.campInfo;
    if (this.gettingstartedData?.welcomeflag) {
      this.welcomeflag = this.gettingstartedData?.welcomeflag
    }

    if (this.gettingstartedData?.type === "create") {
      this.setCamp.campaignID = undefined
    } else {
      if (this.gettingstartedData?.type === "edit") {
        this.setCamp.campaignID = this.gettingstartedData.campaignData?.campaignId;
      }
    }
    this.preKycFlag = this.setCamp.preKycFlag;
    this.getdatafromCampaignTableEdit();
    if (this.isWelcome) {
      if (this.setCamp.startAudioData) {
        this.audioDetail.push(this.setCamp.startAudioData);
      }
      if (this.setCamp.startLeadData) {
        this.leadDetail.push(this.setCamp.startLeadData);
      }
    }
  }
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.visibleLead = false;
    this.visible = false;
  }

  // @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
  //   this.visibleLead = false;
  //   this.visible = false;
  // }

  onclick() {
    this.visible = !this.visible;
    this.getAudiolist();
  }

  onclickLead() {
    this.visibleLead = !this.visibleLead;
    this.getLeadlist();
  }

  getAudiolist() {
    let payload: any = {};

    this.setCamp.getAudioDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.AudioDropdown = result.result;
          this.allAudioDropdown = result.result;
        } else {
          this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }
  getLeadlist() {
    let payload: any = {};
    this.setCamp.getLeadDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          let existingIds:any = this.leadDetail.map((lead:any)=>lead.leadId);
          result.result.forEach((element:any) => {
            if(existingIds.includes(element.leadId)){
              element.notallowed = true;
            }else{
              element.notallowed = false;
            }
          });
          this.LeadDropdown = result.result;
          this.allLeadDropDown = result.result;
          
        } else {
          this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
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

  SelectedAudio(element: any) {
    let obj: any = {
      audioId: element.audioId,
      audioName: element.audioName,
      audioUrl: element?.audioUrl || '',
      audioDuration: element?.audioDuration || ''
    };
    this.audioDetail.push(obj);
    this.visible = false;
  }

  deleteAudio() {
    this.audioDetail = [];
    this.audioId = '';
  }
  deleteLeadList(item: any, i :number) {
    this.leadDetail.splice(i, 1);
  }

  onEditCampaignSchedule() {
    this.openSetupModal();
  }

  openSetupModal() {
    this.isopenCampaignModal = !this.isopenCampaignModal;
  }

  closeModal(event: any, type = '') {
    if (event) {
      if (type == 'campaignSchedule') {
        this.setupflag = true;
        this.campaignscheduleData = event.data;
        this.campaignscheduleData.formatedStartTime =  this.campaignscheduleData.formatedStartTime !== 'Now' ? this.campaignscheduleData.formatedStartTime : moment().format("hh:mm A");
      } else if (type == "uploadLead") {
        let obj: any = {
          leadId: event.leadId,
          leadName: event.leadName,
        };
        this.leadDetail.push(obj);
      } else if (type == "uploadAudio") {
        let obj: any = {
          audioId: event.audioId,
          audioName: event.audioName,
          audioUrl: event.audioUrl,
          audioDescription: event.audioDescription || '',
          audioDuration: event.audioDuration
        };
        this.audioDetail.push(obj);
      } else if(type == "test"){
        this.testedCamp = true;
        this.firstCamp = false;
      }
    }
    this.isopenCampaignModal = false;
    this.isCapmaignCreateOpen = false;
    this.openAudioModal = false;
    this.isopenCampaignCreateModal = false;
    this.isTestCampaignModalModal = false;
  }
  openCreateLeadModal() {
    this.isCapmaignCreateOpen = !this.isCapmaignCreateOpen;
  }
  openCreateAudioModal() {
    this.openAudioModal = !this.openAudioModal;
  }
  openNewCampaign() {
    this.isopenCampaignCreateModal = !this.isopenCampaignCreateModal;
  }

  openTestCampaign() {
    this.audioId = '';
    let obj: any = {
      CampaignName: this.CampaignData,
      leadDetail: this.leadDetail,
      audioDetail: this.audioDetail,
      scheduledDetail: this.campaignscheduleData,
    };
    this.campaigntestData = [];
    this.campaigntestData.push(obj);

    if (this.preKycFlag) {
      this.isTestCampaignModalModal = !this.isTestCampaignModalModal;
    } else {
      this.preKycCallAPI();

    }
  }
  getNewCreateCampaignData() {
    this.CampaignData = this.setCamp.NewCampaignData;
  }
  routetoCampTableScreen() {
    this.router.navigateByUrl('/landing/services/campaign-table');
  }
  runCampaignNow() {
    if (this.preKycFlag) {
      // this.testcampbuttonflag = true;
      this.RunCampaignApi();
    } else {
      this.dialogSer.open(KycServicePopupComponent, {
        data: {
          type: event,
        },
        sidebarPosition: 'center',
        width: '784px',
        close: (reason: any) => {
          if (reason) {
            if (reason === 'skip') {
              this.RunCampaignApi();
            }
            else {
              this.router.navigateByUrl('/landing/settings/kyc');
              // proceed with KYC button press
              // this.dialogSer.close();
            }
          }
          else {
          }
        },
      });
    }
  }
  RunCampaignApi() {
    let payload: any = {
      campaignName: this.CampaignData.CampName,
      campaignDescription: this.CampaignData.CampDesc,
      campaignId: this.setCamp.campaignID,
      campaignType: this.CampaignData.CampType,
      campaignCategory: this.CampaignData ? this.CampaignData?.campaignCategory : '',
      leadList: this.leadDetail,
      audioName: this.audioDetail[0].audioName,
      audioId: this.audioDetail[0].audioId,
      audioUrl: this.audioDetail[0].audioUrl,
      audioDuration: this.audioDetail[0].audioDuration,
      audioDescription:
        this.audioDetail.length > 0 ? this.audioDetail[0].audioDescription : '',
      campaignStatus: this.CampaignData ? this.CampaignData?.campaignStatus : '',
      immediate: this.CampaignData.immediate || this.campaignscheduleData?.immediateFlag ? true : false,
      campaignSchedule: {
        startDate: this.campaignscheduleData.sDate,
        endDate: this.campaignscheduleData.eDate,
        activeDays: this.campaignscheduleData.activeDays,
        startTime: !this.campaignscheduleData?.immediateFlag ? this.campaignscheduleData.fTime : moment().format("HH:mm"),
        endTime: this.campaignscheduleData.tTime,
        retryFlag: this.campaignscheduleData.callRetry,
        noOfRetriesAllowed: this.campaignscheduleData.noOfRetries,
        durationBetweenRetries: this.campaignscheduleData.dRetries,
        durationHrMnt: this.campaignscheduleData.durationHrMnt,
        retry_hangup_causes:this.campaignscheduleData.hangupCause,
      },
      
    };
    if(this.welcomeflag)
    {
      payload.gettingStarted = true;
      payload.journeyId = this.setCamp.journeyId;
    }else
    {
      payload.gettingStarted = false;
    }
    if (this.CampaignData && this.CampaignData.CampType == 'Transactional') {
      payload.callerId = this.CampaignData ? this.CampaignData.CallerId : '';
    }

    this.subscriptonLst.push(
      this.setCamp.runCampaign(payload).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            if(this.welcomeflag)
            {
              this.getOnboarding();
            }
            this.CampaignData = {};
            this.setCamp.NewCampaignData = {};
            this.setCamp.campaignID = '';
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
            this.routetoCampTableScreen();
          } else {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
    );
  }
  saveAsDraf() {
    let payload: any = {
      campaignName: this.CampaignData ? this.CampaignData.CampName : '',
      campaignDescription: this.CampaignData ? this.CampaignData.CampDesc : '',
      campaignId: this.setCamp.campaignID,
      campaignType: this.CampaignData ? this.CampaignData.CampType : '',
      campaignCategory: this.CampaignData ? this.CampaignData?.campaignCategory : '',
      leadList: this.leadDetail,
      audioName:
        this.audioDetail.length > 0 ? this.audioDetail[0].audioName : '',
      audioId: this.audioDetail.length > 0 ? this.audioDetail[0].audioId : '',
      audioUrl: this.audioDetail.length > 0 ? this.audioDetail[0].audioUrl : '',
      audioDuration: this.audioDetail.length > 0 ? this.audioDetail[0].audioDuration : '',
      audioDescription:
        this.audioDetail.length > 0 ? this.audioDetail[0].audioDescription : '',
    };
    if(this.welcomeflag)
    {
      payload.gettingStarted = true;
      payload.journeyId = this.setCamp.journeyId
    }else
    {
      payload.gettingStarted = false;
    }
    if (this.CampaignData && this.CampaignData.CampType == 'Transactional') {
      payload.callerId = this.CampaignData ? this.CampaignData.CallerId : '';
    }
    if (this.campaignscheduleData) {
      payload.campaignSchedule = {
        startDate: this.campaignscheduleData.sDate,
        endDate: this.campaignscheduleData.eDate,
        activeDays: this.campaignscheduleData.activeDays,
        startTime: !this.campaignscheduleData?.immediateFlag ? this.campaignscheduleData.fTime : moment().format("HH:mm"),
        endTime: this.campaignscheduleData.tTime,
        retryFlag: this.campaignscheduleData.callRetry,
        noOfRetriesAllowed: this.campaignscheduleData.noOfRetries,
        durationBetweenRetries: this.campaignscheduleData.dRetries,
        durationHrMnt: this.campaignscheduleData.durationHrMnt,
        retry_hangup_causes:this.campaignscheduleData.hangupCause,
      };
    }

    if (this.editCampId) {
      payload.campaignId = this.editCampId;
    }

    payload.immediate = this.CampaignData.immediate || this.campaignscheduleData?.immediateFlag ? true : false,

    this.subscriptonLst.push(
      this.setCamp.saveAsDraftCampaign(payload).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            if(this.welcomeflag)
            {
              this.getOnboarding();
            }
            this.CampaignData = {};
            this.setCamp.NewCampaignData = {};
            this.setCamp.campaignID = '';
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
            this.routetoCampTableScreen();
          } else {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
    );
  }
  OnCancel() {
      this.dialogSer.open(ConfirmationPopupComponent, {
        data: {
          header: 'Unsaved Changes',
          buttonText: 'Discard changes',
          cancelText: 'Save changes',
          subheader: 'If you leave the page, any changes you have made will be lost',
          type: event,
        },
        sidebarPosition: 'center',
        width: '584px',
        close: (data: any) => {
          if(data){
            this.dialogSer.close();
            if(this.welcomeflag && this.gettingstartedData){
              this.router.navigateByUrl('/landing/services/welcome');
            }else{
              this.router.navigateByUrl('/landing/services/campaign-table');
            }
            
          }
        },
      })
    
  }
  navigateToContact() {
    this.setCamp.subselectedItem = 'contacts';
    this.router.navigateByUrl('/landing/services/manage-contact');

  }

  getdatafromCampaignTableEdit() {
    // Navigating from camp table screen for edit campaign
    this.editCampId = this.setCamp.campaignID;
    if (this.editCampId) {
      this.apiTogetDetailCampaign();
      
    } else {
      this.getNewCreateCampaignData(); //Navigating from Create new camp component
      this.campaignList();
    }
    if(!this.setCamp.preKycFlag){
      this.getDestinationNumber();
    }
    
  }

  apiTogetDetailCampaign() {
    let payload: any = {
      campaignId: this.editCampId,
    };
    this.setCamp.previewCamp(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          let obj: any = {
            audioId: result.result[0].audioId,
            audioName: result.result[0].audioName,
            audioDescription: result.result[0].audioDescription,
            audioUrl: result.result[0]?.audioUrl,
            audioDuration: result.result[0]?.audioDuration,
          };
          if (result.result[0].audioId != '') {
            this.audioDetail.push(obj);
          }

          this.leadDetail = result.result[0].leadList;
          this.CampaignData = {
            CampName: result.result[0].campaignName,
            CampDesc: result.result[0].campaignDescription,
            CallerId: result.result[0].callerId,
            CampType: result.result[0].campaignType,
            isDefault: result.result[0]?.isDefault,
            campaignCategory:result.result[0]?.campaignCategory,
            campaignStatus: result.result[0]?.campaignStatus,
            immediate:result.result[0]?.immediate,
            trialNumber: result?.result[0]?.trailNo
          };
          if(this.CampaignData?.isDefault){
            this.firstCamp = true;
          }else{
            this.testedCamp = true;
            this.firstCamp = false;
          }
          if (result.result[0].campaignSchedule) {
            this.campaignscheduleData = {
              sDate: result.result[0].campaignSchedule.startDate,
              eDate: result.result[0].campaignSchedule.endDate,
              activeDays: result.result[0].campaignSchedule.activeDays,
              fTime: result.result[0].campaignSchedule.startTime,
              tTime: result.result[0].campaignSchedule.endTime,
              callRetry: result.result[0].campaignSchedule.retryFlag,
              noOfRetries: result.result[0].campaignSchedule.noOfRetriesAllowed,
              dRetries: result.result[0].campaignSchedule.durationBetweenRetries,
              durationHrMnt: result.result[0].campaignSchedule.durationHrMnt,
              hangupCause: result.result[0].campaignSchedule.retry_hangup_causes,
              formatedStartTime: moment(result.result[0].campaignSchedule.startTime, ["HH.mm"]).format("hh:mm A"),
              formatedEndTime: moment(result.result[0].campaignSchedule.endTime, ["HH.mm"]).format("hh:mm A"),
              formattedActiveDays:result.result[0].campaignSchedule.activeDays.map((string:any) => string.slice(0, 3))
            };
            this.setupflag = true;
          }
         
        } else {
          this.toastservice.showToast({ 'title': result.message, 'kind': 'error' });
        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error?.message, 'kind': 'error' });
      }
    );
  }

  getAudio(val: any) {
    let payload = {
      audioId: val,
    };
    this.setCamp.getAudioData(payload).subscribe(
      (response: any) => {
        this.audioId =
          'data:audio/mp3;base64,' +
          this.decoder(response.result[0]?.audioFile?.data);
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }

  decoder(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
  clearSearch() {
    this.searchList = '';
    this.audioSearch = '';
    // this.visibleLead=false;
    // this.visible=false;
  }
  preKycCallAPI() {
    let destinationNumberArrayTemp: any = [];
    this.campaignscheduleData?.destinationNumbers?.forEach((ele: any) => {
      destinationNumberArrayTemp.push(ele);
    });
    let payload = {
      "campaignName": this.CampaignData?.CampName,
      "campaignDescription": this.CampaignData?.CampDesc,
      "campaignType": this.CampaignData?.CampType,
      "callerId": this.CampaignData?.CallerId,
      "audioName": this.audioDetail[0]?.audioName,
      "audioId": this.audioDetail[0]?.audioId,
      "audioDescription": this.audioDetail[0].audioDescription,
      "audioUrl": this.audioDetail[0].audioUrl,
      "campaignSchedule": {
        "startDate": this.campaignscheduleData.sDate,
        "endDate": this.campaignscheduleData.eDate,
        "activeDays": [
          this.campaignscheduleData.activeDays
        ],
        "startTime": this.campaignscheduleData.fTime,
        "endTime": this.campaignscheduleData.tTime,
        "retryFlag": this.campaignscheduleData.callRetry,
        "noOfRetriesAllowed": this.campaignscheduleData.noOfRetries,
        "durationBetweenRetries": this.campaignscheduleData.dRetries,
        "durationHrMnt": this.campaignscheduleData.durationHrMnt
      },
      "destinationNumbers": destinationNumberArrayTemp
    };
    this.subscription = this.setCamp
      .testCampaign(payload)
      .subscribe((res: any) => {
        if (res?.status == 'Success') {
          this.testedCamp = true;
          this.firstCamp = false;
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
          this.toastservice.showToast({ 'title': res.message, 'kind': 'error' });
        }
      }, (error: any) => {
        this.toastservice.showToast({ 'title': error.error.message, 'kind': 'error' });
      });
  }
  openTestCampaignModal() {
    this.messageModal = true;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }
  closeSuccess() {
    this.messageModal = false;
    this.closeModaldata.emit(false);
  }
  getOnboarding() {
    let journeyId = this.setCamp.journeyId
      ? this.setCamp.journeyId
      : '';
    this.setCamp.getOnboarding(journeyId).subscribe(
      (onboardDetails: any) => {
        let stageCount = onboardDetails?.result ? onboardDetails?.result[0]?.status : 0;
        this.setCamp.startCountChange.next(stageCount);
    })
  }

  getDestinationNumber(){
    this.selectedNumbers=[];
    this.setCamp.getDestinationNo().subscribe((getCamp:any)=>{
      if(getCamp.status == 'Success' && this.campaignscheduleData){
          this.campaignscheduleData['destinationNumbers'] =  getCamp.result.map((o:any) => o.leadMobileNo);
      }
    })
  }

  campaignList() {
    let payload = {
      page: 1,
      limit: 7,
      searchStr: '',
    };
    this.subscription = this.setCamp.getCampList(payload).subscribe(
      (response: any) => {
        if (response) {
          this.firstCamp = response?.result?.length == 0 ? true : false;
          this.testedCamp = !this.firstCamp ? true : false;
        }
      },
      (error) => {
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      }
    );
  }

  calculateContainerHeight(listLength: number): string {
    if(listLength>4){
      return '200px'
    }else{
      return listLength*40+'px'
    }
  }
}

