import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Config } from 'src/app/core/config/config';
@Injectable({
  providedIn: 'root',
})
export class JctServicesService {
  deviceInfo: any;
  tenantId: any;
  employeeCode: any;
  employeeName: any;
  authDetails: any = {};
  newCampflag: any;
  NewCampaignData: any;
  startLeadData: any;
  startAudioData: any;
  startCount: number = 0;
  campaignID: any;
  dialogdata: any;
  startCountChange: Subject<number> = new Subject<number>();
  journeyId: any = '';
  stageValue: any;
  preKycFlag: boolean;
  indeminityFlag: boolean;
  getleadList: BehaviorSubject<any> = new BehaviorSubject<any>({});
  getLeadListObserver = this.getleadList.asObservable();
  getAudioList: BehaviorSubject<any> = new BehaviorSubject<any>({});
  getAudioListObserver = this.getAudioList.asObservable();
  getCampaignList: BehaviorSubject<any> = new BehaviorSubject<any>({});
  getCampaignListObserver = this.getCampaignList.asObservable();
  getLeadObserver: any;
  getRequestHeaders() {
    return new HttpHeaders({
      deviceid: this.deviceInfo,
    });
  }
  private baseUrl: string = Config.baseUrl;
  // private baseUrl: string = 'https://hrplatformdev.ril.com/api/';
  private employeeURL: string = this.baseUrl + 'employee-i/';
  private campaignURL: string = this.baseUrl + 'jct-campaign-i/';
  private leadURL: string = this.baseUrl + 'jct-leads-i/';
  private leadUrl: string = this.baseUrl + 'jct-leads-i/';
  private audioURL: string = this.baseUrl + 'jct-audio-i/';
  private AudioUrl: string = this.baseUrl + 'jct-audio-i/';
  private CampaignUrl: string = this.baseUrl + 'jct-campaign-i/';
  private KycStatusUrl: string = this.baseUrl + 'jct-kyc-i/';
  private commonUrl: string = this.baseUrl + 'jct-common-i/';
  private virtualNumberUrl: string = this.baseUrl + 'jct-vn-i/'
  menuList: any = [
    {
      bu_menu_sequence: 1,
      displayName: "Automated Outbound Call",
      iconImage: "sidebar-ico auto-call-submenu",
      is_folder: 0,
      menuid: "AutomatedOutboundCall",
      name: "Automated-Outbound-Call",
      sequence: 1,
      shortDescription: "",
      subMenuList: [
        {
          subDisplayName: "Getting Started", subroute: "/landing/services/welcome", subiconImage: "sidebar-ico getting-started-ico-submenu", subname: 'getting-started', isActive: 1
        },
        {
          subDisplayName: "Lead List", subroute: "/landing/services/manage-contact", subiconImage: "sidebar-ico contacts-ico-submenu", subname: 'contacts', isActive: 1
        },
        {
          subDisplayName: "Audio Messages", subroute: "/landing/services/audio", subiconImage: "sidebar-ico audio-ico-submenu", subname: 'audio-messages', isActive: 1
        },
        {
          subDisplayName: "Campaigns", subroute: "/landing/services/campaign-table", subiconImage: "sidebar-ico campaigns-ico-submenu", subname: 'campaigns', isActive: 1
        },
        {
          subDisplayName: "Reports ", subroute: "", subiconImage: "sidebar-ico reports-ico-submenu", subname: 'reports', isActive: 0
        },
      ],
      isActive: 1
    },
    {
      bu_menu_sequence: 2,
      displayName: "SMS Campaign",
      iconImage: "sidebar-ico smscampaign-ico-submenu",
      is_folder: 0,
      menuid: "SMSCampaign",
      name: "SMS-Campaign",
      // route: "",
      sequence: 2,
      shortDescription: "",
      subMenuList: [
        {
          subDisplayName: "Getting Started", subroute: "/landing/services/getting-sms", subiconImage: "sidebar-ico getting-started-ico-submenu", subname: 'getting-sms', isActive: 1
        },
        {
          subDisplayName: "Campaign Management", subroute: "/landing/services/sms-management", subiconImage: "sidebar-ico campaigns-ico-submenu", subname: 'sms-list', isActive: 1
        },
        {
          subDisplayName: "Lead List", subroute: "/landing/services/sms-lead-list", subiconImage: "sidebar-ico contacts-ico-submenu", subname: 'sms-lead-list', isActive: 1
        },
        {
          subDisplayName: "SMS Configuration", subroute: "/landing/services/sms-template-camp", subiconImage: "sidebar-ico contacts-ico-submenu", subname: 'sms-configuration-camp', isActive: 1
        },
        {
          subDisplayName: "Reports ", subroute: "/landing/services/sms-report", subiconImage: "sidebar-ico reports-ico-submenu", subname: 'sms-reports', isActive: 1
        },
      ],
      isActive: 1
    },

    {
      bu_menu_sequence: 3,
      displayName: "Missed Call",
      iconImage: "sidebar-ico missedcall-ico-submenu",
      is_folder: 0,
      menuid: "MissedCall",
      name: "Missed-Call",
      // route: "",
      sequence: 3,
      shortDescription: "",
      subMenuList: [
        {
          subDisplayName: "Getting Started", subroute: "/landing/services/getting-started", subiconImage: "sidebar-ico getting-started-ico-submenu", subname: 'getting-started-missed-call', isActive: 1
        },
        {
          subDisplayName: "Missed Call Management", subroute: "/landing/services/missed-call-mgn", subiconImage: "sidebar-ico campaigns-ico-submenu", subname: 'Missed-call', isActive: 1
        },
        {
          subDisplayName: "Lead List", subroute: "/landing/services/lead-list", subiconImage: "sidebar-ico contacts-ico-submenu", subname: 'missed-lead-list', isActive: 1
        },
        {
          subDisplayName: "Audio Messages", subroute: "/landing/services/missed-audio", subiconImage: "sidebar-ico audio-ico-submenu", subname: 'audio-missed-call', isActive: 1
        },
        {
          subDisplayName: "SMS Configuration", subroute: "/landing/services/sms-template", subiconImage: "sidebar-ico contacts-ico-submenu", subname: 'sms-configuration', isActive: 1
        },
        {
          subDisplayName: "Reports ", subroute: "/landing/services/missed-reports", subiconImage: "sidebar-ico reports-ico-submenu", subname: 'reports', isActive: 1
        },
      ],
      isActive: 1
    },
    {
      bu_menu_sequence: 4,
      displayName: "Click To Call",
      iconImage: "sidebar-ico clickto-call-ico-submenu",
      is_folder: 0,
      menuid: "clicktocall",
      name: "clicktocall",
      // route: "",
      sequence: 4,
      shortDescription: "",
      subMenuList: [],
      isActive: 0
    },
    {
      bu_menu_sequence: 5,
      displayName: "Toll Free",
      iconImage: "sidebar-ico tollfree-ico-submenu",
      is_folder: 0,
      menuid: "tollfree",
      name: "tollfree",
      // route: "",
      sequence: 5,
      shortDescription: "",
      subMenuList: [],
      isActive: 0
    },
    {
      bu_menu_sequence: 6,
      displayName: "Smart IVR",
      iconImage: "sidebar-ico smartivr-ico-submenu",
      is_folder: 0,
      menuid: "smartivr",
      name: "smartivr",
      // route: "",
      sequence: 6,
      shortDescription: "",
      subMenuList: [],
      isActive: 0
    },
    // {
    //   bu_menu_sequence: 7,
    //   displayName: "Missed Call",
    //   iconImage: "sidebar-ico missedcall-ico-submenu",
    //   is_folder: 0,
    //   menuid: "missedcall",
    //   name: "missedcall",
    //   // route: "",
    //   sequence: 7,
    //   shortDescription: "",
    //   subMenuList: [],
    //   isActive: 0
    // },
    {
      bu_menu_sequence: 7,
      displayName: "Conferencing",
      iconImage: "sidebar-ico conferencing-ico-submenu",
      is_folder: 0,
      menuid: "conferencing",
      name: "conferencing",
      // route: "",
      sequence: 7,
      shortDescription: "",
      subMenuList: [],
      isActive: 0
    },
    {
      bu_menu_sequence: 8,
      displayName: "Virtual Number",
      iconImage: "sidebar-ico virtual-number-ico-submenu",
      is_folder: 0,
      menuid: "virtual-number",
      name: "virtual-number",
      // route: "",
      sequence: 8,
      shortDescription: "",
      subMenuList: [],
      isActive: 0
    },
  ];
  public subselectedItem: string = '';
  startMenuChange: Subject<any> = new Subject<any>();
  backTrackFlag: any = {};
  arrayToexpand: any = [{ key: true, value: 'AutomatedOutboundCall' }];
  proceedDone: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.startCountChange.subscribe((value) => {
      this.startCount = value;
      this.stageValue = value;
    });

    this.startMenuChange.subscribe((value) => {
      this.subselectedItem = value.subname;
      if (value.subroute) {
        this.router.navigateByUrl(value.subroute);
      }
    });
  }

  getRegisteredEmployee(obj: any) {
    return this.http.post(this.employeeURL + 'getRegisteredEmployee', obj);
  }

  getRegognizedEmployee(obj: any) {
    return this.http.post(this.employeeURL + 'getRecognizedEmployee', obj);
  }

  openUserModal(imgData: any) {
    loadRemoteModule({
      type: 'module',
      remoteEntry: environment.HR_URL + '/faceservices/remoteEntry.js',
      exposedModule: './Component',
    }).then((ref) => {
      console.log('dkdk', ref);
      // let dialogRef = this.dialog.open(ref.UserPicsComponent, {
      //   panelClass: 'modal-dialog-box',
      //   width: '350px',
      //   data: imgData,
      // });
      // dialogRef.afterClosed().subscribe((result) => { });
    });
  }

  getLeadList(obj: any) {
    return this.http.post(this.leadURL + 'getLeads', obj);
  }
  downloadFile() {
    return this.http.get(this.leadUrl + 'excelTemplateDownload', {
      responseType: 'blob' as 'json',
    });
  }

  LeadList(obj: any) {
    return this.http.post(this.leadUrl + 'getLeadList', obj);
  }

  getAudioTableData(payload: any) {
    return this.http.post(this.audioURL + 'getAudioList', payload);
  }
  getAudioData(payload: any) {
    return this.http.post(this.audioURL + 'getAudioData', payload);
  }

  validateExcel(data: any) {
    return this.http.post(this.leadUrl + 'validateleadlist', data);
    // validateExcel
  }

  uploadFile(data: any) {
    return this.http.post(this.leadUrl + 'leadlistupload', data);
  }

  uploadAudioFile(data: any) {
    return this.http.post(this.AudioUrl + 'uploadAudioFile', data);
  }


  b64ToBinary(b64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    var sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    var byteCharacters = window.atob(b64Data);
    var byteArrays = [];
    for (
      var offset = 0;
      offset < byteCharacters.length;
      offset = offset + sliceSize
    ) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  getCallerId(payload: any) {
    return this.http.post(this.virtualNumberUrl + 'getTrailNumber', payload);
  }

  runCampaign(data: any) {
    return this.http.post(this.CampaignUrl + 'createCampaign', data);
  }
  saveAsDraftCampaign(data: any) {
    return this.http.post(this.CampaignUrl + 'saveDraftCampaign', data);
  }
  getCampList(obj: any) {
    return this.http.post(this.campaignURL + 'getCamplist', obj);
  }

  getLeadDropdownList(obj: any) {
    return this.http.post(this.leadURL + 'getLeadList', obj);
  }
  getAudioDropdownList(obj: any) {
    return this.http.post(this.audioURL + 'getAudioDropdown', obj);
  }

  previewCamp(obj: any) {
    return this.http.post(this.campaignURL + 'previewCampaign', obj);
  }

  testCampaign(payload: any) {
    return this.http.post(this.campaignURL + 'testCampaign', payload);
  }

  getOnboarding(journeyId: string) {
    journeyId = journeyId ? '?journeyId=' + journeyId.toString() : '';
    return this.http.get(this.campaignURL + 'getOnboardingDetails' + journeyId);
  }
  deleteLeadAudio(payload: any) {
    return this.http.post(this.leadURL + 'clearGettingStarted', payload);
  }

  updateCampaignstatus(status: any) {
    return this.http.post(this.CampaignUrl + 'updateCampaignStatus', status);
  }

  addNewContact(payload: any) {
    return this.http.post(this.leadURL + 'addNewContact', payload);
  }
  getLeadListOfContacts(payload: any) {
    return this.http.post(this.leadURL + 'getContactList', payload);
  }
  getCampaignReport(payload: any) {
    return this.http.post(this.leadUrl + 'reportView', payload);
  }
  downloadReport(campaignReportId: any, filetype: any) {
    return this.http.get(this.leadURL + 'Reportdownload?campaignId=' + campaignReportId + '&format=' + filetype, {
      responseType: 'blob' as 'json',
    });
  }

  getCampaignPiechart(campId: string) {
    return this.http.get(this.campaignURL + 'getCampaignChartData?campaignId=' + campId + '&includeDetails=true');
  }

  getLineChart(payload: any) {
    return this.http.post(this.campaignURL + 'getGraphDetails', payload);
  }

  getAudioTimeFormat(totalSeconds: any) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 60));
    let result: any = `${minutes
      .toString()
      .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (!!hours) {
      result = `${hours.toString()}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return result;
  }

  kycStatusApi(obj: any) {
    return this.http.post(this.KycStatusUrl + 'getKycDetails', obj);
  }

  getCampaignCategory() {
    return this.http.get(this.campaignURL + 'getCampaignCategory');
  }

  getDestinationNo() {
    return this.http.get(this.CampaignUrl + 'getDestinationNo');
  }
  deleteDestinationNo(payload: any) {
    return this.http.post(this.CampaignUrl + 'delDestinationNo', payload);
  }
  sendOtp(payload: any) {
    return this.http.post(this.CampaignUrl + 'sendOTP', payload);
  }
  verifyOTP(payload: any) {
    return this.http.post(this.CampaignUrl + 'verifyOTP', payload);
  }
  addDestinationNumber(payload: any) {
    return this.http.post(this.CampaignUrl + 'addDestinationNumber', payload);
  }

  getDaysNamebetweenDates(from: any, to: any) {
    var d = new Date(from);
    var t = new Date(to);
    var a = [];
    var y = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    while (d < t) {
      a.push(y[d.getDay()]);
      d.setDate(d.getDate() + 1);
    }
    if (d.getDay() === t.getDay()) // include last day
      a.push(y[d.getDay()]);
    return a;
  }

  TermcondtionSave(obj: any) {
    return this.http.post(this.KycStatusUrl + 'updateTandc', obj);
  }

  checkCampaignExist(obj: any) {
    return this.http.post(this.CampaignUrl + 'checkCampaignExists', obj);
  }
  getDefaultTTSAudio(obj: any) {
    return this.http.post(this.audioURL + 'getDefaultTTSAudio', obj);
  }
  getTTSAudio(obj: any) {
    return this.http.post(this.audioURL + 'getTTSAudio', obj);
  }
  autogrowtextArea(textArea: any) {
    if (textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.maxHeight = '86px';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }
  getTTSLimit(){
    return this.http.get(this.audioURL + 'ttsLimit');
  }

  downloadSampleFile() {
    return this.http.get(this.leadUrl + 'excelTemplateDownloadWithCustom', {
      responseType: 'blob' as 'json',
    });
  }
}



