import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
@Component({
  selector: 'app-kyc-service-popup',
  templateUrl: './kyc-service-popup.component.html',
  styleUrls: ['./kyc-service-popup.component.scss']
})
export class KycServicePopupComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  ngOnInit(): void {
  }
  onClose(){
    this.dialogService.close()
  }
  
  actionModal(type:any){
    this.dialogService.close(type);
  }
}
