import {
  Component,
  ViewEncapsulation,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { JctServicesService } from '../services/jctservices.service';
import { ToastService } from '../shared/custom-elements/custom-toast/toast-service.service';

@Component({
  selector: 'app-test-campaign-modal',
  templateUrl: './test-campaign-modal.component.html',
  styleUrls: ['./test-campaign-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestCampaignModalComponent implements OnInit, OnChanges {
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  testCampArray: any = [];
  numbers: any;
  destinationNumber: FormGroup;
  stopAddNumber: boolean = false;
  disableTest: boolean = true;
  total: any;
  audioId: any;
  audioData: any = '';
  subscription: Subscription;
  audioFlag: boolean = false;
  messageModal: boolean = false;
  messageHeader: any = '';
  messageSubheaderOne: any = '';
  mesasgeSubheaderTwo: any = '';
  msgIcon: any = '';
  activeAudio: any;
  audioDuration: any;

  destinationOtpNumber: FormGroup;
  addNumberV: boolean = false;
  errorMessage: any;
  errorMessageverify: any;
  isuserLocked: any;
  noOfAttempts: any;
  timerVal = 120;
  otpTimerSub: any;
  @Input() selectedNumbers: any = [];
  @Input() trialNumber: boolean = false;
  codeOtp = [{ label: '+91', value: '+91' }];

  constructor(
    private testCampaignData: JctServicesService,
    private toastservice: ToastService
  ) { }

  ngOnInit(): void {
    this.audioData = this.testCampArray[0]?.audioDetail[0]?.audioUrl;
    this.audioDuration = this.testCampArray[0]?.audioDetail[0]?.audioDuration;
    if (this.trialNumber){
      this.destinationOtpNumber = new FormGroup({
        otpNumber: new FormArray([]),
      });
      this.addOtpNumber();
    }
    else{
      this.destinationNumber = new FormGroup({
        desNumber: new FormArray([
          new FormGroup({
            number: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
            code: new FormControl(1),
          }),
        ]),
      });
    }
  }
  ngOnChanges() {
    this.testCampArray = this.data;
    this.audioId = this.testCampArray[0]?.audioDetail[0]?.audioId;
    this.audioData = this.testCampArray[0]?.audioDetail[0]?.audioUrl;
    
  }

  get desNumber(): FormArray {
    return this.destinationNumber.get('desNumber') as FormArray;
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

  addNumber() {
    this.desNumber.push(
      new FormGroup({
        number: new FormControl(''),
        code: new FormControl(1),
      })
    );

    if (this.desNumber.controls.length > 4) {
      this.stopAddNumber = true;
    } else {
      this.stopAddNumber = false;
    }

    if (this.desNumber.controls.length > this.total) {
      this.disableTest = true;
    }
  }

  popNumber(i: any) {
    this.desNumber.removeAt(i);
    if (this.desNumber.controls.length > 4) {
      this.stopAddNumber = true;
    } else {
      this.stopAddNumber = false;
    }

    if (this.desNumber.controls.length > this.total) {
      this.disableTest = true;
    }
  }

  numberTest() {
    this.desNumber.controls.forEach((element: any) => {
      let total = 1;
      if (element.value.number == '') {
        total += total;
      } else {
        total -= total;
      }

      this.total = total;
      if (
        total == this.desNumber.controls.length ||
        element.value.number == ''
      ) {
        this.disableTest = true;
      } else if (total == 0) {
        this.disableTest = false;
      }
    });
  }

  openTestCampaignModal() {
    this.messageModal = true;
  }

  testCampaignCall() {
    if (!this.trialNumber){
      let valuesStringify = this.desNumber.controls?.length > 0 ? this.desNumber.controls.map(x => x.value.number) : [];
      let duplicate = valuesStringify.some((item, i) => valuesStringify.indexOf(item) !== i);
      if (!duplicate) {
        this.messageModal = false;
        this.msgIcon = '';
        this.messageHeader = '';
        this.messageSubheaderOne = '';
        this.mesasgeSubheaderTwo = '';
        let destinationNumberArray: any = [];
        this.desNumber.controls.forEach((ele: any) => {
          destinationNumberArray.push('+91' + ele.value.number);
        });
        let payload = {
          "campaignName": this.data[0]?.CampaignName.CampName,
          "campaignDescription": this.data[0]?.CampaignName.CampDesc,
          "campaignType": this.data[0]?.CampaignName.CampType,
          "callerId": this.data[0]?.CampaignName.CallerId,
          "audioName": this.data[0]?.audioDetail[0].audioName,
          "audioId": this.data[0]?.audioDetail[0].audioId,
          "audioDescription": this.data[0]?.audioDetail[0].audioDescription,
          "audioUrl": this.data[0]?.audioDetail[0].audioUrl,
          "campaignSchedule": {
            "startDate": this.data[0]?.scheduledDetail.sDate,
            "endDate": this.data[0]?.scheduledDetail.eDate,
            "activeDays": [
              this.data[0]?.scheduledDetail.activeDays
            ],
            "startTime": this.data[0]?.scheduledDetail.fTime,
            "endTime": this.data[0]?.scheduledDetail.tTime,
            "retryFlag": this.data[0]?.scheduledDetail.callRetry,
            "noOfRetriesAllowed": this.data[0]?.scheduledDetail.noOfRetries,
            "durationBetweenRetries": this.data[0]?.scheduledDetail.dRetries,
            "durationHrMnt": this.data[0]?.scheduledDetail.durationHrMnt
          },
          "destinationNumbers": destinationNumberArray
        };
        this.subscription = this.testCampaignData
          .testCampaign(payload)
          .subscribe((res: any) => {
            if (res?.status == 'Success') {
              this.msgIcon = 'success';
              this.messageHeader = 'Test campaign has been run successfully';
              this.messageSubheaderOne = 'Test Campaign has been run successfully';
              this.mesasgeSubheaderTwo = 'You can run the campaign now';
              this.openTestCampaignModal();

            } else {
              this.msgIcon = 'error';
              this.messageHeader = 'Test campaign failed';
              this.messageSubheaderOne = 'Test campaign failed. Please check the entered number or retry again.';
              this.mesasgeSubheaderTwo = '';
              this.openTestCampaignModal();
              // this.toastservice.showToast({ 'title': res.message, 'kind': 'error' });
            }
          }, (error: any) => {
            this.toastservice.showToast({ 'title': error.error.message, 'kind': 'error' });
          });
      } else {
        this.toastservice.showToast({ 'title': 'Destination numbers should be Unique', 'kind': 'error' })
      }
    }else {
      let destinationNumberArray: any = [];
        this.otpNumber.controls.forEach((ele: any) => {
          destinationNumberArray.push('+91' + ele.value.number);
        });
        let payload = {
          "campaignName": this.data[0]?.CampaignName.CampName,
          "campaignDescription": this.data[0]?.CampaignName.CampDesc,
          "campaignType": this.data[0]?.CampaignName.CampType,
          "callerId": this.data[0]?.CampaignName.CallerId,
          "audioName": this.data[0]?.audioDetail[0].audioName,
          "audioId": this.data[0]?.audioDetail[0].audioId,
          "audioDescription": this.data[0]?.audioDetail[0].audioDescription,
          "audioUrl": this.data[0]?.audioDetail[0].audioUrl,
          "campaignSchedule": {
            "startDate": this.data[0]?.scheduledDetail.sDate,
            "endDate": this.data[0]?.scheduledDetail.eDate,
            "activeDays": [
              this.data[0]?.scheduledDetail.activeDays
            ],
            "startTime": this.data[0]?.scheduledDetail.fTime,
            "endTime": this.data[0]?.scheduledDetail.tTime,
            "retryFlag": this.data[0]?.scheduledDetail.callRetry,
            "noOfRetriesAllowed": this.data[0]?.scheduledDetail.noOfRetries,
            "durationBetweenRetries": this.data[0]?.scheduledDetail.dRetries,
            "durationHrMnt": this.data[0]?.scheduledDetail.durationHrMnt
          },
          "destinationNumbers": destinationNumberArray
        };
        this.subscription = this.testCampaignData
          .testCampaign(payload)
          .subscribe((res: any) => {
            if (res?.status == 'Success') {
              this.msgIcon = 'success';
              this.messageHeader = 'Test campaign has been run successfully';
              this.messageSubheaderOne = 'Test Campaign has been run successfully';
              this.mesasgeSubheaderTwo = 'You can run the campaign now';
              this.openTestCampaignModal();

            } else {
              this.msgIcon = 'error';
              this.messageHeader = 'Test campaign failed';
              this.messageSubheaderOne = 'Test campaign failed. Please check the entered number or retry again.';
              this.mesasgeSubheaderTwo = '';
              this.openTestCampaignModal();
              // this.toastservice.showToast({ 'title': res.message, 'kind': 'error' });
            }
          }, (error: any) => {
            this.toastservice.showToast({ 'title': error.error.message, 'kind': 'error' });
          });
    }

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  onlyNumberKeyTest(event: any) {
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 47 && event.charCode <= 57;
  }

  cancelModal() {
    this.closeModal.emit(false);
  }

  closeSuccess() {
    this.messageModal = false;
    this.closeModal.emit(true);
  }
  createForm(Data: any) {
    return new FormGroup({
      number: new FormControl(Data.actualNumber != null ? Data.actualNumber : '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      otp: new FormControl(Data.otp != null ? Data.otp : '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      vbutton: new FormControl(Data.vbutton),
      otpbutton: new FormControl(Data.otpbutton),
      Vmessage: new FormControl(Data.Vmessage, Validators.requiredTrue),
      errormsg: new FormControl(''),
      leadId: new FormControl(Data.leadId),
    });
  }
  get otpNumber(): FormArray {
    return this.destinationOtpNumber.get('otpNumber') as FormArray;
  }
  addOtpNumber() {
    // this.addNumberV = false;
    this.otpNumber.push(
      new FormGroup({
        number: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        otp: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
        vbutton: new FormControl(false),
        otpbutton: new FormControl(false),
        Vmessage: new FormControl(false, Validators.requiredTrue),
        errormsg: new FormControl(''),
      })
    );
    if (this.otpNumber.controls.length < 5) {
      this.addNumberV = true;
    } else {
      this.addNumberV = false;
    }
  }
  confirmbutton(inputCntrl: any, index: any) {
    this.startTimer(inputCntrl);
    let payload: any = {
      otp: Number(inputCntrl.value.otp),
      mobileNo: inputCntrl.value.number,
      flag: 'm',
    };
    this.testCampaignData.verifyOTP(payload).subscribe({
      next: (getCamp: any) => {
        if (getCamp.status == 'Success') {
          inputCntrl.controls.vbutton.setValue(false);
          inputCntrl.controls.otpbutton.setValue(false);
          inputCntrl.controls.Vmessage.setValue(true);
          if (this.otpNumber.controls.length < 5) {
            ///Show add number button
            this.addNumberV = true;
          } else {
            this.addNumberV = false;
          }
        } else {
          // if otp failed we have to make changes in below condiotions
          inputCntrl.controls.vbutton.setValue(false);
          inputCntrl.controls.otpbutton.setValue(true);
          inputCntrl.controls.Vmessage.setValue(false);
          if (this.otpNumber.controls.length < 5) {
            ///Show add number button
            this.addNumberV = true;
          } else {
            this.addNumberV = false;
          }
        }
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.isuserLocked = error.error.isLocked;
        this.noOfAttempts = error.error.attempt;
      }
    });
  }
  startTimer(inputCntrl: any) {
    let otp_timer = timer(0, 1000);
    this.timerVal = 120;
    this.otpTimerSub?.unsubscribe();
    this.otpTimerSub = otp_timer.subscribe((t) => {
      if (this.timerVal !== 0) {
        this.timerVal--;
      } else {
        this.otpTimerSub?.unsubscribe();
        inputCntrl.controls.vbutton.setValue(false);
        inputCntrl.controls.otpbutton.setValue(false);
        inputCntrl.controls.Vmessage.setValue(false);
        inputCntrl.status = 'INVALID';
      }
    });
  }

  onlyNumberKeyTestForOtp(event: any, inputCntrl: any, action: boolean) {
    if (action) {
      inputCntrl.controls.errormsg.setValue('');
    }
    this.addNumberV = false;
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 47 && event.charCode <= 57;
  }
  verifyNumber(value: any, inputCntrl: any) {
    inputCntrl.controls.errormsg.setValue('');
    this.errorMessage = '';
    let payload: any = {
      mobileNo: inputCntrl.value.number,
      flag: 'm',
    };
    this.testCampaignData.sendOtp(payload).subscribe({
      next: (getCamp: any) => {
        if (getCamp.status == 'Success') {
          inputCntrl.controls.vbutton.setValue(true);

          this.startTimer(inputCntrl);
        } else {
          if (getCamp.status == 'failed') {
            this.errorMessageverify = getCamp.message;
          }
        }
      },
      error: (error: any) => {
        inputCntrl.controls.errormsg.setValue(error.error.message);
        this.errorMessageverify = error.error.message;
      }
    });
  }

  RemoveNumber(value: any, index: any) {
    this.otpNumber.removeAt(index);
    if(this.selectedNumbers.filter((num:any)=> num.actualNumber.includes(value.value.number))?.length > 0){
      this.delete(value);
    }
    
    if (this.otpNumber.controls.length < 5) {
      ///Show add number button
      this.addNumberV = true;
    } else {
      this.addNumberV = false;
    }
  }
  delete(inputCntrl: any) {
    let payload: any = {
      leadId: inputCntrl.value.leadId,
      mobileNo: inputCntrl.value.number,
    };
    this.testCampaignData.deleteDestinationNo(payload).subscribe({
      next: (getCamp: any) => {
      if (getCamp.status == 'Success') {
        this.toastservice.showToast({ 'title': getCamp?.result, 'kind': 'success' });
      }else{
        this.toastservice.showToast({ 'title': getCamp?.message, 'kind': 'error' });
      }
      },
      error: (error:any)=>{
        this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
      }
    });
  }

}
