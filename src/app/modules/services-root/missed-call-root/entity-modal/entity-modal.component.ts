import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-entity-modal',
  templateUrl: './entity-modal.component.html',
  styleUrls: ['./entity-modal.component.scss'],
})
export class EntityModalComponent implements OnInit {
  entityId: any;
  entityClone:any;
  subscription: Subscription;
  enablebtn:boolean = true;
  
  constructor(
    private dialogRefSelf: DialogService,
    private misscallService: JctMisscallService,
    public toastservice: ToastService
  ) {}

  ngOnInit(): void {
    this.misscallService.setEntityID.subscribe((res) => {
      if (res) {
        this.entityId = res;
        this.entityClone = this.entityId;
      }
    });
  }
  onClose() {
    this.dialogRefSelf.close();
  }

  onSave() {
    let payload = {
      entityId: this.entityId,
    };

    this.subscription = this.misscallService.updateEntityId(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          this.misscallService.setEntityID.next(this.entityId);

          this.toastservice.showToast({ title: resp.message, kind: 'success' });
          this.dialogRefSelf.close('success');
        } else {
          this.toastservice.showToast({ title: resp.message, kind: 'error' });
          this.dialogRefSelf.close();
        }
      },
      (err) => {
        this.toastservice.showToast({
          title: err?.error?.message,
          kind: 'error',
        });
        this.dialogRefSelf.close();
      }
    );
  }

  isNumber(evt: any) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkTextChange(event:any){
    if(this.entityClone !== event){
      this.enablebtn = false;
    }else{
      this.enablebtn = true;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
