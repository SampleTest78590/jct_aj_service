import { Component, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-time-view',
  templateUrl: './time-view.component.html',
  styleUrls: ['./time-view.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TimeViewComponent implements OnInit {

  @Input() anchorEl: HTMLElement;
  @Input() open: boolean = false;
  @Output() closeTimeCb: EventEmitter<any> = new EventEmitter<any>();
  minutesArray:any = [ ...Array(60).keys() ].map((i:any) => i= ('0' + i).slice(-2));
  hoursArray:any = [ ...Array(12).keys() ].map((i) => i=i+1);
  formatTime:any = ['AM','PM'];
  @Input() startImmediatelyFlag:boolean = false;
  @Input()selectedHour:any = new Date().getHours();
  @Input()selectedMinutes:any = ('0' + new Date().getMinutes()).slice(-2);
  @Input()selectedFormat:any = new Date().toLocaleString([], { hour12: true}).split(" ")[2];
  @Output() getValues: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeTimePicker(event: any): void {
    event.stopPropagation();
    this.open = false;
    this.closeTimeCb.emit();
  }

  handleDone(event: any): void {
    event.stopPropagation();
    this.getValues.emit({
        hour: this.selectedHour,
        minutes: this.selectedMinutes,
        format: this.selectedFormat,
        dateType:true
    });
  }

  handleSubmit(event: any): void {
      event.stopPropagation();
      this.getValues.emit({
        dateType:false,
        format: 'Now'
    });
  }

  setHours(hour:any){
    this.selectedHour = hour;
  }

  setMinutes(minute:any){
    this.selectedMinutes = minute;
  }

  setFormat(format:any){
    this.selectedFormat = format;
  }
}

