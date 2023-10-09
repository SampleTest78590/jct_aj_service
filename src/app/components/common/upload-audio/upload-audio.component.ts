import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, } from '@angular/core';
import { ToastService } from '../shared/custom-elements/custom-toast/toast-service.service';
import { Subscription } from 'rxjs';
import { JctServicesService } from '../services/jctservices.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadAudioComponent implements OnInit {
  @Input() data: any;
  dialog: any;
  uploadDragDrop: boolean = true;
  filesToUpload: any = [];
  totalSize: number;
  existingFileArray = [];
  deletedFile = [];
  AudioName: any;
  AudioDescription: any;
  AudioAttachedName: any;
  AudioSize: any;
  file: any;
  base64data: any;
  disabledUpload: boolean = true;
  subscriptonLst: Subscription[] = [];
  mediaDur: any = '';
  indeminityFlag: boolean;
  @Output() closeModal = new EventEmitter();
  preKycFlag: boolean = false;
  radioSelected: any = '1';
  languageList: any = [
    {
      label: 'English', value: 'english',
    },
    {
      label: 'Hindi', value: 'hindi',
    }
  ];
  voiceList: any = [{
    label: 'Male', value: 'male',
  },
  {
    label: 'Female', value: 'female',
  }];
  selectedlanguage: any = 'english';
  selectedvoice: any = 'female';
  certifyFlag: boolean;
  sampalAudioUrl = '';
  audio: HTMLMediaElement;
  showLoader: boolean = false;
  disabledConvertButton: boolean = true;
  ttsLimit: boolean = false;
  showConvertButton: boolean;

  @ViewChild('audioElement', { static: true }) audioElement: any;

  constructor(
    private audioService: JctServicesService,
    public toastservice: ToastService, private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.disabledConvertButton = this.AudioDescription ? false : true;
    this.audio = this.audioElement?.nativeElement;
    if (this.audioService.indeminityFlag) {
      this.indeminityFlag = true;
    } else {
      this.indeminityFlag = false;
    }
    this.playSampleAudio();
    this.getTtsLimit();
  }

  readyToUpload(event: any): void {
    this.mediaDur = 0;
    this.AudioAttachedName = event.files[0].name;
    // this.AudioSize = event.files[0].size;
    this.file = event.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      const b64 = e.target?.result;
      this.base64data = b64;
      var media = new Audio(e.target?.result?.toString());
      media.onloadedmetadata = () => {
        var mediaDuration = media.duration;
        this.mediaDur = this.audioService.getAudioTimeFormat(mediaDuration)// this would give duration of the video/audio file
      };
    };
    this.filesToUpload = event?.files;
    this.uploadDragDrop = false;
    this.filesToUpload.forEach((file: any) => {
      if (file?.fileId == '' || file?.fileId == undefined) {
        file.imageURL =
          event?.imageUrls[
            event?.imageUrls.length - 1
          ]?.changingThisBreaksApplicationSecurity;
      }
    });
    this.checkFileSize();
  }

  checkFileSize() {
    this.totalSize = 0;
    // this.haveAttachments = false;
    if (this.filesToUpload.length > 0) {
      // this.haveAttachments = true;
      this.filesToUpload.forEach((file: any) => {
        this.totalSize = this.totalSize + file.size;
      });
    }
    if (this.totalSize > 2000000) {
      this.toastservice.showToast({ 'title': 'Size limit is 2mb', 'kind': 'error' });
    }
  }

  removeFile(event: any): void {
    this.uploadDragDrop = true;
    this.filesToUpload = [];
  }
  UploadAudioSubmit() {
    this.disabledUpload = false;
    let formData = new FormData();
    formData.append('acknowledgement', 'true');
    formData.append('audioName', this.AudioName);
    formData.append('audioDescription', this.AudioDescription ? this.AudioDescription : '');
    formData.append('audioDuration', this.mediaDur);
    formData.append('type',this.radioSelected=='1'?'UPLOAD':'TTS');
    formData.append(
      'gettingStarted',
      this.data && this.data.flag ? 'true' : 'false'
    );
    if (this.data?.journeyId) {
      formData.append('journeyId', this.data.journeyId);
    }

    if (this.filesToUpload.length > 0) {
      this.filesToUpload.forEach((file: any) => {
        formData.append('file', file);
      });
    }

    this.subscriptonLst.push(
      this.audioService.uploadAudioFile(formData).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            this.closeModal.emit({
              audioId: resp?.message.audioId,
              audioName: resp?.message.audioName,
              audioDescription: resp?.message.audioDescription,
              audioBinaryCode: this.base64data,
              audioUrl: resp?.message.audioUrl,
              audioDuration: resp?.message.audioDuration
            })
            this.toastservice.showToast({ 'title': resp?.message.message, 'kind': 'success' });
          } else {
            this.disabledUpload = true;
            this.toastservice.showToast({ 'title': resp?.message, 'kind': 'success' });
          }
        },
        (err: any) => {
          this.disabledUpload = true;
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
    );
  }

  onCancel() {
    this.closeModal.emit(false);
  }

  validateCharNumAudio(evt: any) {
    let charCodeAudio = evt.which ? evt.which : evt.keyCode;
    if (
      (charCodeAudio >= 48 && charCodeAudio !== 64 && charCodeAudio <= 90) ||
      (charCodeAudio >= 97 && charCodeAudio <= 122) ||
      charCodeAudio === 32
    ) {
      return true;
    } else {
      return false;
    }
  }
  autogrowtextArea() {
    if (this.ttsLimit){
      this.showConvertButton = false;
    }else{
      this.showConvertButton = true;
      this.disabledConvertButton = this.AudioDescription ? false : true;
    }
    let textArea = document.getElementById("audiotextarea");
    let callertextArea = document.getElementById("callertextarea");
    this.audioService.autogrowtextArea(textArea);
    this.audioService.autogrowtextArea(callertextArea);
  }
  onLanguageChange(event: any) {
    this.selectedlanguage = event?.value;
    this.playSampleAudio()

  }
  onSelectChange(event: any) {
    this.selectedvoice = event?.value;
    this.playSampleAudio()
  }
  playSampleAudio() {
    if(this.AudioDescription?.length){
      this.disabledConvertButton = false;
    }
    this.audioService.getDefaultTTSAudio({ language: this.selectedlanguage, gender: this.selectedvoice }).subscribe((res: any) => {
      this.sampalAudioUrl = res?.result?.audioUrl
    })
  }
  getTTSAudio() {
    this.showLoader = true;
    this.audioService.getTTSAudio({ language: this.selectedlanguage, gender: this.selectedvoice, text: this.AudioDescription }).subscribe(
      {
        next: (res: any) => {
          this.showLoader = false;
          if (res?.status?.toLowerCase() === 'success'){
            let TYPED_ARRAY = new Uint8Array(res?.message?.audioContent?.data).buffer;
            let blob = new Blob([TYPED_ARRAY], { type: "audio/wav" })
            const myFile = new File([blob], 'abc.wav', {
              type: blob.type,
            });
            this.base64data = this.sanitizer.bypassSecurityTrustUrl(
              URL.createObjectURL(blob)
            );
            this.file = myFile;
            var reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
              var media = new Audio(e.target?.result?.toString());
              media.onloadedmetadata = () => {
                var mediaDuration = media.duration;
                this.mediaDur = this.audioService.getAudioTimeFormat(mediaDuration)// this would give duration of the video/audio file
              };
            };
            
            this.filesToUpload = [myFile];
            this.checkFileSize();
            if(res?.message?.ttsAllow){
              this.ttsLimit = false;
              this.showConvertButton = true;
              this.disabledConvertButton = true;
            }
            else{
              this.ttsLimit = true;
              this.showConvertButton = false;
            }
            this.toastservice.showToast({ 'title': res?.message?.msg, 'kind': 'success' });
          }else{
            this.toastservice.showToast({ 'title': res?.message?.msg, 'kind': 'error' });
          }
        },
        error: (err: any) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      }
    )
  }
  changeTimelinePosition() {
    if (this.audio.ended) {
      this.audio.pause()
    }
  }
  getTtsLimit(){
    this.subscriptonLst.push(
      this.audioService.getTTSLimit().subscribe({
        next: (res: any) => {
          if (res?.status?.toLowerCase() === 'success'){
            this.ttsLimit = !res?.result?.flag;  // false = reached the limit
            if (this.ttsLimit){
              this.showConvertButton = false;
            }else{
              this.showConvertButton = true;
              this.disabledConvertButton = this.AudioDescription ? false : true;
            }
          }
        },
        error: (err: any) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      })
    )
  }
  resetValue(){
    this.AudioName = '';
    this.AudioDescription = '';
    this.filesToUpload = [];
    this.mediaDur = '';
    this.base64data = '';
    this.file = null;
    this.indeminityFlag = false;
    if (this.audioService.indeminityFlag) {
      this.indeminityFlag = true;
    } else {
      this.indeminityFlag = false;
    }
    this.disabledConvertButton = true;
    this.removeFile({});
  }
}
