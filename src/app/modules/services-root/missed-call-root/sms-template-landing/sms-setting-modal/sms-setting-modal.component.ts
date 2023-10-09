import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-sms-setting-modal',
  templateUrl: './sms-setting-modal.component.html',
  styleUrls: ['./sms-setting-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmsSettingModalComponent implements OnInit {
  smsTempDesc: any;
  smsTempId: any;
  senderId: any;
  entityId: any;
  smsType: any;
  subscription: Subscription;
  saveSmsSettingEnabled: boolean = false;
  senderIdMsg: any = '';
  categoryList: any = [];
  selectedcategory: any = '';
  smsLanguageList: any = [];
  selectedSmsLanguage: any = '';
  constructor(
    private dialogService: DialogService,
    private misscallService: JctMisscallService,
    public toastservice: ToastService,
    private smsCampService: JctSmsService,
    private jctService: JctServicesService
  ) { }

  ngOnInit(): void {
    this.misscallService.setEntityID.subscribe((res) => {
      if (res) {
        this.entityId = res;
      }
    });
  this.smsLanguage();
    this.smsCampaignType();
    this.smsLanguage();

  }
  onCancel() {
    this.dialogService.close();
  }
  onSaveSmsSetting() {
    let payload = {
      entityId: this.entityId,
      senderId: this.senderId,
      smsTemplateId: this.smsTempId,
      smsTemplateText: this.smsTempDesc,
      smsType: this.selectedcategory,
      smsLanguage: this.selectedSmsLanguage
    };

    this.subscription = this.misscallService.saveSmsConfig(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.toastservice.showToast({ title: resp.message, kind: 'success' });
          this.dialogService.close('Success');
        } else {
          this.toastservice.showToast({ title: resp.message, kind: 'error' });
          this.dialogService.close();
        }
      },
      (err) => {
        this.toastservice.showToast({
          title: err?.error?.message,
          kind: 'error',
        });
        this.dialogService.close();
      }
    );
  }

  validateCharNum(evt: any, allowEnterFlag: boolean) {
    this.saveSmsSettingEnabled = false;
    if (
      this.entityId?.length > 11 && this.entityId?.length < 20 &&
      this.senderId != '' &&
      this.senderId?.length >= 3 &&
      this.smsTempId?.length >= 12 &&
      this.smsTempId?.length < 20 &&
      this.smsTempDesc?.length >= 1 &&
      this.smsTempDesc?.length < 1001 && this.senderIdMsg == '' && this.selectedcategory != "" && this.selectedSmsLanguage != ""
    ) {
      this.saveSmsSettingEnabled = true;
    }
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (allowEnterFlag) {
      if (
        (charCode >= 48 && charCode !== 64 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        charCode === 32 ||
        charCode === 13
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        (charCode >= 48 && charCode !== 64 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        charCode === 32
      ) {
        return true;
      } else {
        return false;
      }
    }

  }

  smsCampaignType() {
    let payload: any = {
    }
    this.categoryList = [];
    this.subscription = this.smsCampService.selectSmsType(payload).subscribe((res: any) => {
      if (res.status == 'Success') {
        const categoryList: any = [];
        res?.result.forEach((element: any) => {
          categoryList.push({ label: element, value: element })
        });
        this.categoryList = categoryList;

      }
    },
      (error: { error: { message: any; }; }) => {
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      });

  }
  selectCategory(event: any) {
    this.selectedcategory = event?.label;
    if (this.entityId?.length == 19 && this.senderId != "" && this.senderId?.length >= 3 && this.selectedcategory != "" && this.smsTempId?.length >= 12 && this.smsTempId?.length < 20 && this.smsTempDesc?.length >= 1 && this.smsTempDesc?.length < 1001) {
      this.saveSmsSettingEnabled = true;
    }
  }
  smsLanguage() {
    let payload: any = {
    }
    this.smsLanguageList = [];
    this.subscription = this.smsCampService.getsmsLanguage(payload).subscribe((res: any) => {
      if (res.status == 'Success') {
        const smsLanguageList: any = [];
        res?.result.forEach((element: any) => {
          smsLanguageList.push({ label: element, value: element })
        });
        this.smsLanguageList = smsLanguageList;

      }
    },
      (error: { error: { message: any; }; }) => {
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      });

  }

  SmsLanguageSelected(event: any) {
    this.selectedSmsLanguage = event?.label;
    if (this.entityId?.length == 19 && this.senderId != "" && this.senderId?.length >= 3 && this.selectedcategory != "" && this.smsTempId?.length >= 12 && this.smsTempId?.length < 20 && this.smsTempDesc?.length >= 1 && this.smsTempDesc?.length < 1001 && this.selectedSmsLanguage != '') {
      this.saveSmsSettingEnabled = true;
    }
  }

  isNumberEntity(evt: any) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validatesenderId(event: any) {
    this.saveSmsSettingEnabled = false;
    if (
      this.entityId?.length == 19 &&
      this.senderId != '' &&
      this.senderId?.length == 6 &&
      this.smsTempId?.length >= 12 &&
      this.smsTempId?.length < 20 &&
      this.smsTempDesc?.length >= 1 &&
      this.smsTempDesc?.length < 1001 && this.senderIdMsg == ''
    ) {
      this.saveSmsSettingEnabled = true;
    }
    let alphaReg = new RegExp(/^[a-z]+$/i);
    let numReg = new RegExp(/^\d+$/);
    if (alphaReg.test(event.charAt(0))) {
      if (alphaReg.test(event)) {
        this.senderIdMsg = '';
        return true;
      } else {
        this.senderIdMsg = 'Sender ID should be either Alphabetic or Numeric';
        return false;
      }
    } else if (numReg.test(event.charAt(0))) {
      if (numReg.test(event)) {
        this.senderIdMsg = '';
        return true;
      } else {
        this.senderIdMsg = 'Sender ID should be either Alphabetic or Numeric';
        return false;
      }
    } else {
      this.senderIdMsg = 'Sender ID should be either Alphabetic or Numeric';
      return false;
    }
  }

  autogrowtextArea() {
    let textArea = document.getElementById("smstextarea");
    this.jctService.autogrowtextArea(textArea);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
