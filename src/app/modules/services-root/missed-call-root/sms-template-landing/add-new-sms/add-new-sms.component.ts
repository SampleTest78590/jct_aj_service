import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { SenderIdModalComponent } from '../../sender-id-modal/sender-id-modal.component';
import { Router } from '@angular/router';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';

@Component({
  selector: 'app-add-new-sms',
  templateUrl: './add-new-sms.component.html',
  styleUrls: ['./add-new-sms.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddNewSmsComponent implements OnInit {

  categoryList: any = ['RGBAAG'];
  selectedSendorId: any = '';
  entityId: any = "";
  subscription: Subscription;
  sendorIdList: any = [];
  smstempText: any;
  smstempId: any;
  smsType: any;
  urlvalue: any;
  saveButtonEnabled: boolean = false
  categoryTypeList: any = [];
  selectedTypeCategory: any = '';
  smsLanguageList: any = [];
  selectedSmsLanguage: any = '';
  constructor(private dialogRefSelf: DialogService, private misscallService: JctMisscallService, public smsCampService: JctSmsService,
    public toastservice: ToastService, public router: Router,private jctService: JctServicesService) { }

  ngOnInit(): void {
    this.misscallService.setEntityID.subscribe((res) => {
      if (res) {
        this.entityId = res;

      }

    })
    this.getSenderIdList();
    this.smsCampaignType();
    this.smsLanguage();

  }

  onClose() {
    this.dialogRefSelf.close();
    //this.closeModal.emit(false);
  }

  selectCategory(event: any) {
    this.selectedSendorId = event?.label;
    if (this.selectedSendorId != "" && this.smstempId?.length >= 12 && this.smstempId?.length < 20 && this.smstempText?.length >= 1 && this.smstempText?.length < 1001) {
      this.saveButtonEnabled = true;
    }
  }
  getSenderIdList() {
    let payload = {
      "entityId": this.entityId,

    }

    this.subscription =
      this.misscallService.getSenderIdList(payload).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            resp?.result.forEach((element: any) => {
              this.sendorIdList.push({ label: element.senderId, value: element.senderId });
            });


          } else {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
        }
      )
  }

  validateCharNum(evt: any) {

    this.saveButtonEnabled = false
    if (this.selectedSendorId != "" && this.selectedTypeCategory != "" && this.smstempId?.length >= 12 && this.smstempId?.length < 20 && this.smstempText?.length >= 1 && this.smstempText?.length < 1001 && this.selectedSmsLanguage != '') {
      this.saveButtonEnabled = true;
    }
    let charCode = evt.which ? evt.which : evt.keyCode;
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
  }

  newsenderId(event: any) {
    this.saveButtonEnabled = false
    if (this.selectedSendorId != "" && this.smstempId?.length >= 12 && this.smstempId?.length < 20 && this.smstempText?.length >= 1 && this.smstempText?.length < 1001) {
      this.saveButtonEnabled = true;
    }
    this.urlvalue = window.location.href;
    this.dialogRefSelf.close('newId');
    this.openSenderIdModal(this.urlvalue)
  }
  openSenderIdModal(eventP: any) {
    this.dialogRefSelf.open(SenderIdModalComponent, {
      sidebarPosition: '',
      width: '590px',
      data: {

      },
      close: (data: any) => {
        if (eventP.includes("sms-template-camp")) {
          this.router.navigate(['/landing/services/sms-template-camp']);
        } else {
          this.router.navigate(['/landing/services/sms-template']);
        }

      }
    });
  }

  saveSMSTemplate() {
    let payload = {

      "entityId": this.entityId,
      "senderId": this.selectedSendorId,
      "smsTemplateId": this.smstempId,
      "smsTemplateText": this.smstempText,
      "smsType": this.selectedTypeCategory,
      "smsLanguage": this.selectedSmsLanguage
    }



    this.subscription =
      this.misscallService.saveSMSTemplate(payload).subscribe(
        (resp: any) => {
          if (resp.status == 'Success') {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
            this.dialogRefSelf.close('Success');


          } else {
            this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
            this.dialogRefSelf.close();
          }
        },
        (err) => {
          this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
          this.dialogRefSelf.close();
        }
      )
  }

  smsCampaignType() {
    let payload: any = {
    }
    this.categoryTypeList = [];
    this.subscription = this.smsCampService.selectSmsType(payload).subscribe((res: any) => {
      if (res.status == 'Success') {
        const categoryTypeList: any = [];
        res?.result.forEach((element: any) => {
          categoryTypeList.push({ label: element, value: element })
        });
        this.categoryTypeList = categoryTypeList;

      }
    },
      (error: { error: { message: any; }; }) => {
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      });

  }
  selectTypeCategory(event: any) {
    this.selectedTypeCategory = event?.label;
    if (this.selectedSendorId != "" && this.selectedTypeCategory != "" && this.smstempId?.length >= 12 && this.smstempId?.length < 20 && this.smstempText?.length >= 1 && this.smstempText?.length < 1001) {
      this.saveButtonEnabled = true;
    }
  }
  smsLanguage() {
    let payload: any = {}
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
    if (this.selectedSendorId != "" && this.selectedTypeCategory != "" && this.smstempId?.length >= 12 && this.smstempId?.length < 20 && this.smstempText?.length >= 1 && this.smstempText?.length < 1001 && this.selectedSmsLanguage != "") {
      this.saveButtonEnabled = true;
    }
  }
  autogrowtextArea() {
    let textArea = document.getElementById("smstextarea"); 
    this.jctService.autogrowtextArea(textArea);
  }
}