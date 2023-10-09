import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Config } from 'src/app/core/config/config';
@Component({
  selector: 'app-upload-single-lead',
  templateUrl: './upload-single-lead.component.html',
  styleUrls: ['./upload-single-lead.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadSingleLeadComponent implements OnInit {
  subscription: Subscription;
  newContact: FormGroup;
  @Input() leadId: any;
  message: string = '';
  @Output() closeModal = new EventEmitter();
  code = [
    { label: '+91', value: '+91' },
  ]

  emailvalidation: any = Config.emailregex;
  constructor(private dialogRef: DialogService,
    private service: JctServicesService,
    public toastservice: ToastService,
  ) { }

  ngOnInit(): void {
    this.newContact = new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      number: new FormControl('', Validators.required),
      email: new FormControl(''),
      company: new FormControl(''),

    });
  }

  clearError() {
    this.message = ''
  }

  saveSingleLead(type: any) {
    let statusPayload: any = {
      "leadId": this.leadId,
      "leadFirstName": this.newContact.value.name,
      "leadLastName": this.newContact.value.lastname,
      "leadMobileNo": "+91" + this.newContact.value.number
    };
    this.service.addNewContact(statusPayload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.toastservice.showToast({
            title: resp?.message,
            kind: 'success',
          });
          this.dialogRef.onMessagePush();
          if (type === "SaveAdd") {
            this.newContact.reset();
          }else{
            this.dialogRef.close();
          }
        } else {
          this.toastservice.showToast({
            title: resp?.message,
            kind: 'error',
          });
        }
      },
      (error: any) => {
        this.toastservice.showToast({
          title: error?.error?.message,
          kind: 'error',
        });
      }
    );

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  getErrorMessage(type: any) {
    switch (type) {
      case 'email':
        if (
          this.newContact.controls['email'].hasError('required') &&
          type == 'email'
        ) {
          return 'Email ID is required';
        } else if (this.newContact.controls['email'].invalid) {
          return 'Email ID is Invalid';
        } else {
          return '';
        }
        break;
      case 'name':
        if (this.newContact.controls['name'].invalid) {
          return 'Minimum 3 characters are required';
        } else {
          return '';
        }
        default:
          return "";

    }
  }

  onClose() {
    this.dialogRef.close();
  }
  
  onlyNumberKey(event: any) {
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 47 && event.charCode <= 57;
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
}
