import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../shared/custom-elements/dialog/dialog.service';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { JctServicesService } from '../../services/jctservices.service';
import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs';
import { ToastService } from '../../shared/custom-elements/custom-toast/toast-service.service';
@Component({
  selector: 'app-destination-number',
  templateUrl: './destination-number.component.html',
  styleUrls: ['./destination-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DestinationNumberComponent implements OnInit {
  destinationNumber: FormGroup;
  addNumberV: boolean = false;
  indexflag: any = 0;
  otpTimerSub: any;

  @Input() selectedNumbers: any = [];
  errorMessage: any;
  errorMessageverify: any;
  isuserLocked: any;
  noOfAttempts: any;
  timerVal = 120;
  code = [{ label: '+91', value: '+91' }];

  constructor(
    private dialogService: DialogService,
    private createCamp: JctServicesService,
    private toastservice:ToastService
  ) {}

  ngOnInit(): void {

    this.addNumberV = true;
    this.destinationNumber = new FormGroup({
      desNumber: new FormArray([]),
    });
    const userCtrl = this.destinationNumber.get('desNumber') as FormArray;
    this.selectedNumbers.forEach((Data: any) => {
      let countryCodeLength = Data.number?.length - 10;
      // let code = Data.number.substr(0, countryCodeLength);
      Data.actualNumber =  Data.number.substr(countryCodeLength, Data.number?.length);
      userCtrl.push(this.createForm(Data));
    });
    if (this.desNumber.controls.length == 1) {
      ///Show add number button
      this.addNumber();
    }
    if (this.desNumber.controls.length < 5) {
      ///Show add number button
      this.addNumberV = true;
    } else {
      this.addNumberV = false;
    }
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
  get desNumber(): FormArray {
    return this.destinationNumber.get('desNumber') as FormArray;
  }

  closeModal() {
    this.dialogService.close('Success');
  }

  addNumber() {
    this.addNumberV = false;
    this.desNumber.push(
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
  }
  defaultValue() {
    this.desNumber.push(
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
  }
  confirmbutton(inputCntrl: any, index: any) {
    this.startTimer(inputCntrl);
    let payload: any = {
      otp: Number(inputCntrl.value.otp),
      mobileNo: inputCntrl.value.number,
      flag: 'm',
    };
    this.createCamp.verifyOTP(payload).subscribe(
      (getCamp: any) => {
        if (getCamp.status == 'Success') {
          inputCntrl.controls.vbutton.setValue(false);
          inputCntrl.controls.otpbutton.setValue(false);
          inputCntrl.controls.Vmessage.setValue(true);
          if (this.desNumber.controls.length < 5) {
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
          if (this.desNumber.controls.length < 5) {
            ///Show add number button
            this.addNumberV = true;
          } else {
            this.addNumberV = false;
          }
        }
      },
      (error: any) => {
        this.errorMessage = error.error.message;
        this.isuserLocked = error.error.isLocked;
        // if (error.error.isLocked) {
        //   inputCntrl.controls.vbutton.setValue(false);
        // }
        this.noOfAttempts = error.error.attempt;
      }
    );
  }
  interval: any;
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
  timeRemaining$ = timer(0, 1000).pipe(
    map((n) => (2 - n) * 1000),
    takeWhile((n) => n >= 0)
  );

  onlyNumberKeyTest(event: any, inputCntrl: any, action: boolean) {
    if (action) {
      inputCntrl.controls.errormsg.setValue('');
    }

    this.addNumberV = false;
    if (event.target.value.length > 9) {
    }
    

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
    this.createCamp.sendOtp(payload).subscribe(
      (getCamp: any) => {
        if (getCamp.status == 'Success') {
          inputCntrl.controls.vbutton.setValue(true);

          this.startTimer(inputCntrl);
        } else {
          if (getCamp.status == 'failed') {
            this.errorMessageverify = getCamp.message;
          }
        }
      },
      (error: any) => {
        inputCntrl.controls.errormsg.setValue(error.error.message);
        this.errorMessageverify = error.error.message;
      }
    );
  }

  RemoveNumber(value: any, index: any) {
    this.desNumber.removeAt(index);
    if (this.desNumber.length == 1) {
      this.addNumber();
    }
    if(this.selectedNumbers.filter((num:any)=> num.actualNumber.includes(value.value.number))?.length > 0){
      this.delete(value);
    }
    
    if (this.desNumber.controls.length < 5) {
      ///Show add number button
      this.addNumberV = true;
    } else {
      this.addNumberV = false;
    }
  }

  save() {
    let numberarr: any = [];
    this.desNumber?.value.forEach((element: any, index: any) => {
      if (index >= 1) numberarr.push(element.number);
    });
    let payload: any = {
      mobileNoArr: numberarr,
    };
    this.createCamp.addDestinationNumber(payload).subscribe((getCamp: any) => {
      if (getCamp.status == 'Success') {
        this.dialogService.close('Success');
      }
    });
  }

  delete(inputCntrl: any) {
    let payload: any = {
      leadId: inputCntrl.value.leadId,
      mobileNo: inputCntrl.value.number,
    };
    this.createCamp.deleteDestinationNo(payload).subscribe((getCamp: any) => {
      if (getCamp.status == 'Success') {
        // this.selectedNumbers.splice(index, 1)
        this.toastservice.showToast({ 'title': getCamp?.result, 'kind': 'success' });
      }else{
        this.toastservice.showToast({ 'title': getCamp?.message, 'kind': 'error' });
      }
    },(error:any)=>{
      this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
    });
  }
}
