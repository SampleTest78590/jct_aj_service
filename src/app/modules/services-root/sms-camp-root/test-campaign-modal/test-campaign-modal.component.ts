import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'sms-test-campaign-modal',
  templateUrl: './test-campaign-modal.component.html',
  styleUrls: ['./test-campaign-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SMSTestCampaignComponent implements OnInit {
  readMoreTextcamp = 'Read More';
  readMorecamp: boolean = false;
  tesNumber: any;
  destinationNumber: FormGroup;
  readMoreSMS: boolean = false;
  @Input() gettingStartedObj: any = [];
  total: any;
  disableTest: boolean = true;
  stopAddNumber: boolean = false;
  subscription: Subscription;
  messageModal: boolean = false;
  messageHeader: any = '';
  messageSubheaderOne: any = '';
  mesasgeSubheaderTwo: any = '';
  msgIcon: any = '';
  @Output() closeModaldata: EventEmitter<any> = new EventEmitter<any>();
  customize_msg: any = '';
  customizeFieldForm: FormGroup;
  code = [{ label: '+91', value: '+91' }];
  invalidFlag:boolean = false;


  constructor(private dialogRef: DialogService, private jctSmsService: JctSmsService, private toastservice: ToastService) { }

  ngOnInit(): void {
    this.destinationNumber = new FormGroup({
      desNumber: new FormArray([
        new FormGroup({
          number: new FormControl(this.gettingStartedObj?.destinationNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
          // code: new FormControl(1),
        }),
      ]),
    });
    if (this.gettingStartedObj?.smsContentType?.type === 'customized') {
      this.customizeFieldForm = new FormGroup({
        fieldValues: new FormArray([
        ])
      })
      let count = (this.gettingStartedObj?.feedbackSMS?.smsTemplateText.match(/custom_field_/g))?.length;
      let i = 0, result = this.gettingStartedObj?.feedbackSMS?.smsTemplateText;
      while (i < count) {
        result = (result).replace('custom_field_' + (i + 1), '{var}');
        const fieldValues = this.customizeFieldForm?.get('fieldValues') as FormArray;
        fieldValues.push(new FormGroup({
          fieldVal: new FormControl('', Validators.required)
        }));
        i++;
      }
      this.customize_msg = result;
    }
  }

  get desNumber(): FormArray {
    return this.destinationNumber.get('desNumber') as FormArray;
  }

  readMoreSMSClick() {
    if (this.readMoreTextcamp === 'Read Less') {
      this.readMoreSMS = false;
      this.readMoreTextcamp = 'Read Less' ? 'Read More' : '';
    } else {
      this.readMoreSMS = true;
      this.readMoreTextcamp = 'Read More' ? 'Read Less' : '';
    }
  }

  onCancel() {
    this.dialogRef.close()
  }

  addNumber() {
    this.invalidFlag = false;
    this.desNumber.push(
      new FormGroup({
        number: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        // code: new FormControl(1),
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

  numberTest() {
    this.invalidFlag = false;
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

  onlyNumberKeyTest(event: any, inputCntrl: any, action: boolean) {
    if (action) {
      inputCntrl.controls.errormsg.setValue('');
    }
    if (event.target.value.length > 9) {
    }
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 47 && event.charCode <= 57;
  }

  testCampaign() {
    let destinationNumberArray: string[] = [];
    this.desNumber.controls.forEach((ele: any) => {
      destinationNumberArray.push('+91' + ele.value.number);
    });
    
    if(this.desNumber.value.filter((v:any)=> v.number == '')?.length > 0 || this.desNumber.status == 'INVALID'){
      this.invalidFlag = true;
    }else{
      this.invalidFlag = false;
    }
    let fieldValues: any = [];
    if (this.gettingStartedObj?.smsContentType?.type === 'customized') {
      fieldValues = this.customizeFieldForm.get('fieldValues') as FormArray;
    }
    if(!this.invalidFlag){
      let payload = {
        "entityId": this.gettingStartedObj?.feedbackSMS?.entityId,
        "senderId": this.gettingStartedObj?.feedbackSMS?.senderId,
        "smsContentType": this.gettingStartedObj?.smsContentType?.type,
        "smsType": this.gettingStartedObj?.feedbackSMS?.smsType,
        "smsTemplateId": this.gettingStartedObj?.feedbackSMS?.smsTemplateId,
        "smsMessage": this.gettingStartedObj?.feedbackSMS?.smsTemplateText,
        "destinationNumbers": destinationNumberArray,
        "customFieldsValue": this.gettingStartedObj?.smsContentType?.type === 'customized' ? fieldValues.controls.map((item: any) => { return item.controls.fieldVal.value }) : []
      }
      this.subscription = this.jctSmsService
        .testCampaignForSMS(payload)
        .subscribe((res: any) => {
          if (res?.status === 'Success') {
            this.msgIcon = 'success';
            this.messageHeader = 'Testing Started';
            this.mesasgeSubheaderTwo = 'You will soon get a SMS on the entered numbers.'
            this.openTestCampaignModal();
  
          } else {
            this.msgIcon = 'error';
            this.messageHeader = 'Test campaign failed';
            this.mesasgeSubheaderTwo = 'Kindly check the entered values during campaign setup.'
          }
        }, (error: any) => {
          this.toastservice.showToast({ 'title': error.error.message, 'kind': 'error' });
        });
    }
   
  }

  openTestCampaignModal() {
    this.messageModal = true;
  }

  closeSuccess() {
    this.messageModal = false;
    this.closeModaldata.emit(false);
    this.dialogRef.close()
  }



}
