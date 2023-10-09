import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom-message-modal',
  templateUrl: './custom-message-modal.component.html',
  styleUrls: ['./custom-message-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomMesasgeModalComponent implements OnInit {

  @Input() icon: any = 'success';
  iconMap: any = {
    'success': 'assets/images/svg/ico-profile.svg',
    'error': 'assets/images/svg/ico-error.svg'
  }
  @Input() header: any = '';
  @Input() subheaderOne: any = '';
  @Input() subheaderTwo: any = '';
  @Output() closeEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onModalClose(data: any) {
    this.closeEvent.emit(false);
  }
}
