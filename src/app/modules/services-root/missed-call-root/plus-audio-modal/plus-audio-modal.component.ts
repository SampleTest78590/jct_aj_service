import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-plus-audio-modal',
  templateUrl: './plus-audio-modal.component.html',
  styleUrls: ['./plus-audio-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlusAudioModalComponent implements OnInit {

  @Input() isWelcome: boolean = false;
  visible: Boolean = false;
  AudioDropdown: any;
  allAudioDropdown: any;
  audioDetail: any = [];
  openAudioModal: boolean = false;
  @Input() getstartData: any = '';
  @Input() gettingFlag: boolean = false;
  @Output() closeModaldata: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogRefSelf: DialogService, private setCamp: JctServicesService,
    private missedcall: JctMisscallService, private toastservice: ToastService) { }

  ngOnInit(): void {
    if(this.getstartData?.audioUpload)
    {
      this.audioDetail.push(this.getstartData?.audioUpload)
    }
  }

  SelectedAudio(element: any) {
    let obj: any = {
      audioId: element.audioId,
      audioName: element.audioName,
      audioUrl: element?.audioUrl || '',
      audioDuration: element?.audioDuration || '',
      audioDes: element?.audioDescription
    };
    this.audioDetail.push(obj);
    this.visible = false;
  }

  getAudiolist() {
    let payload: any = {};

    this.setCamp.getAudioDropdownList(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.AudioDropdown = result.result;
          this.allAudioDropdown = result.result;
        } else {
          // this.toastservice.showToast({ 'title': 'No data found', 'kind': 'error' });
        }
      },
      (error) => {
        // this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    );
  }

  onclick() {
    this.visible = !this.visible;
    this.getAudiolist();
  }

  onCancel() {
    this.dialogRefSelf.close();
    //this.closeModal.emit(false);
  }

  openCreateAudioModal() {
    this.openAudioModal = !this.openAudioModal;
    // let dialogRefAudio = this.dialogRefSelf.open(UploadAudioComponent, {
    //   panelClass: 'rtl-dialog-box',
    //   width: '540px',
    //   height: '100vh',
    //   autoFocus: false,
    //   position: { right: '0' },
    //   animation: { to: 'left' },

    //   // data: {
    //   //   flag: true,
    //   //   journeyId: this.welcomservice.journeyId,
    //   // },
    //   close: (reason: any) => {
    //     if (reason) {
    //       // call api to refresh page
    //     }
    //   }
    // });
  }
  deleteAudio() {
    this.audioDetail = [];

  }
  closeModal(event: any, type = '') {
    this.openAudioModal = false;
    if (event) {
      let obj: any = {
        audioId: event?.audioId,
        audioName: event?.audioName,
        audioUrl: event?.audioUrl || '',
        audioDuration: event?.audioDuration || '',
        audioDes: event.audioDescription
      };
      this.audioDetail.push(obj);
    }
  }
  saveAudioDetail() {
    let payload: any = {
      "audioData": {
        "audioName": this.audioDetail[0].audioName,
        "audioId": this.audioDetail[0].audioId,
        "audioDuration":this.audioDetail[0].audioDuration,
        "audioDescription": this.audioDetail[0].audioDes,
        "audioUrl": this.audioDetail[0].audioUrl,
      }
    }
    
      payload.gettingStarted = this.gettingFlag;
  
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
          // this.dialogRefSelf.close();
        }
      },
      (err) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        // this.dialogRefSelf.close();
      }
    )
  }
  onSearch(event: any, arrayName: any) {
    if (arrayName === 'LeadDropdown') {
      // this.LeadDropdown = this.onSearchFilter(
      //   event,
      //   this.allLeadDropDown,
      //   'leadName'
      // );
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

  calculateHeight(listLength: number): string {
    if(listLength>4){
      return '200px'
    }else{
      return listLength*40+'px'
    }
  }
}
