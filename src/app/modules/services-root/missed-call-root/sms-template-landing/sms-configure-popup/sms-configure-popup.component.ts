import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-sms-configure-popup',
  templateUrl: './sms-configure-popup.component.html',
  styleUrls: ['./sms-configure-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SmsConfigurePopupComponent implements OnInit {
  closeEvent: any;
  @Input() header: any = '';
  @Input() subheader: any = '';
  _id: any;
  type: any;
  buttonText: string;

  constructor(private dialogSer: DialogService) { }

  ngOnInit(): void {
  }

  onModalClose(status:any) {
    this.dialogSer.close(status);
  }

}
