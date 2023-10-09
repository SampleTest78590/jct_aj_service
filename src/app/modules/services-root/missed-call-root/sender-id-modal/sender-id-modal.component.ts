import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-sender-id-modal',
  templateUrl: './sender-id-modal.component.html',
  styleUrls: ['./sender-id-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SenderIdModalComponent implements OnInit {
  senderId: any = '';
  entityId: any = '';
  subscription: Subscription;
  sendorFlag: boolean = false;
  senderIdMsg: any = '';

  constructor(
    private dialogRefSelf: DialogService,
    private misscallService: JctMisscallService,
    public toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.misscallService.setEntityID.subscribe((res) => {
      if (res) {
        this.entityId = res;
      }
    });
  }

  onCancel() {
    this.dialogRefSelf.close();
  }
  onSaveSendor() {
    let payload = {
      entityId: this.entityId,
      senderId: this.senderId,
    };

    this.subscription = this.misscallService.addNewSenderID(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.toastservice.showToast({ title: resp.message, kind: 'success' });
          this.dialogRefSelf.close('newId');
        } else {
          this.toastservice.showToast({ title: resp.message, kind: 'error' });
        }
      },
      (err) => {
        this.toastservice.showToast({
          title: err?.error?.message,
          kind: 'error',
        });
      }
    );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  validatesenderIdAdd(event: any) {
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

}
