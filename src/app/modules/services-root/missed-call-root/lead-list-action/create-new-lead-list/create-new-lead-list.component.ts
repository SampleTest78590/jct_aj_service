import { Component, OnInit } from '@angular/core';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-create-new-lead-list',
  templateUrl: './create-new-lead-list.component.html',
  styleUrls: ['./create-new-lead-list.component.scss']
})
export class CreateNewLeadListComponent implements OnInit {
  LeadName:any;
  LeadDes:any;

  constructor(private dialogRefSelf:DialogService,
     private createCamp: JctServicesService,
     private createCampmissed: JctMisscallService,
     private toastservice: ToastService
    ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRefSelf.close();
  }
  validateCharNum(evt: any) {
    let charCode = evt.which ? evt.which : evt.keyCode;
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
  saveLeadList(){
    let payload: any = {
      "leadDescription": this.LeadDes,
      "leadName": this.LeadName
      
      }
    
    this.createCampmissed.createNewLeadList(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {
          let data = resp?.result;
          this.toastservice.showToast({ 'title': 'Data created', 'kind': 'success' });
          this.dialogRefSelf.close(data);
        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          // this.dialogRefSelf.close('leadC');
        }
      },
      (err) => {
        // this.dialogRefSelf.close('leadC');
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }
  autogrowtextArea() {
    let textArea = document.getElementById("leadtextarea"); 
    this.createCamp.autogrowtextArea(textArea);
  }
}
