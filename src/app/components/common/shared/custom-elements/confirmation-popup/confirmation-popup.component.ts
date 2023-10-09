import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-confirmation-popup.component',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationPopupComponent implements OnInit {

  @Input() icon: any = 'success';
  iconMap: any = {
    'success': 'assets/images/svg/ico-profile.svg',
    'error': 'assets/images/svg/ico-error.svg'
  }
  @Input() header: any = '';
  @Input() subheader: any = '';
  _id:any;
  type:any;
  buttonText:string;
  @Input() cancelText:any = 'Cancel';
  constructor(private dialogSer:DialogService) { }

  ngOnInit(): void {
  }

  onModalClose() {
    this.dialogSer.close();
  }

  actionModal(){
    this.dialogSer.close('success');
  }

}
