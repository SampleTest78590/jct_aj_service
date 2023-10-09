import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-terms-condition-popup',
  templateUrl: './terms-condition-popup.component.html',
  styleUrls: ['./terms-condition-popup.component.scss']
})
export class TermsConditionPopupComponent implements OnInit {
  isCheck:any
  isDisabled:boolean=false;
  
  constructor(private dialogSer:DialogService) { }

  ngOnInit(): void {
  }
  
  proceedEnable(){
      this.isDisabled=!this.isDisabled;
  }
  onClose(){
    this.dialogSer.close()
  }
  
  actionModal(){
    this.dialogSer.close('successTerm');
  }
  
}
