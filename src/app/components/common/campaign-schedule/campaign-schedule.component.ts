import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DestinationNumberComponent } from './destination-number/destination-number.component';
import { DialogService } from '../shared/custom-elements/dialog/dialog.service';
import { JctServicesService } from '../services/jctservices.service';
import { ToastService } from '../shared/custom-elements/custom-toast/toast-service.service';

@Component({
  selector: 'app-campaign-schedule',
  templateUrl: './campaign-schedule.component.html',
  styleUrls: ['./campaign-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampaignScheduleComponent implements OnInit {
  sDate: any;
  eDate: any;
  fTime: any;
  tTime: any;
  dRetries: any;
  noOfRetries: number = 0;
  selectedDuration: string;
  @Input() data: any;
  @Output() closeModal = new EventEmitter();
  openDatePicker = false;
  openEndDatePicker = false;
  daysCheckbox = [
    {
      name: 'Sunday',
      checked: false,
      disabled:true
    },
    {
      name: 'Monday',
      checked: false,
      disabled:true
    },
    {
      name: 'Tuesday',
      checked: false,
      disabled:true
    },
    {
      name: 'Wednesday',
      checked: false,
      disabled:true
    },
    {
      name: 'Thursday',
      checked: false,
      disabled:true
    },
    {
      name: 'Friday',
      checked: false,
      disabled:true
    },
    {
      name: 'Saturday',
      checked: false,
      disabled:true
    },
  ];
  retrys: number[] = [1, 2, 3];
  durations = [
    { label: 'Hrs', value: 'hrs' },
    { label: 'Mins', value: 'min' }];

  allDaysChecked = false;
  retrySettings: boolean = false;
  activeDaysFlag: boolean = false;
  retryCheckFlag: boolean = false;
  validatedMinDate: any = new Date();
  isModalOpen: boolean = false;
  destinationNumber: any = [];
  hangupCause:any = [{
    key:'Busy',
    value:'USER_BUSY',
    checked: false
  },{
    key:'No Answer',
    value:'NO_ANSWER',
    checked: false
  },{
    key:'Failed',
    value:'FAILED',
    checked: false
  }];
  savedHangupcauses:any = [];
  kycFlag:boolean = false;
  selectedNumbers:any = [];
  allDaysDisabled:boolean = true;
  currentTime:any = moment(new Date).add(15, 'minutes').format('HH:mm');
  openSTimePicker = false;
  openTTimePicker = false;
  formatStart:any;
  formatEnd:any;
  startObj:any = {};
  endObj:any = {};
  now:any = new Date().toISOString().slice(0, 10);
  immediateFlag:boolean = false;
  errorTimeFlag:any = '';

  constructor(
    private dialogService: DialogService,
    private scheduleSer:JctServicesService,
    private createCamp: JctServicesService,
    private toastservice:ToastService
  ) { }
  


  ngOnInit(): void {
    if(this.scheduleSer.preKycFlag){
      this.kycFlag = true;
    }else{
      this.kycFlag = false;
      this.getDestinationNumber();
    }
    if (this.data) {
      const campaignsScheduleData = this.data;
      this.sDate = this.datechange(campaignsScheduleData?.sDate);
      this.eDate = this.datechange(campaignsScheduleData?.eDate);
      if (this.sDate == "Invalid Date") {
        this.sDate = undefined
      }
      if (this.eDate == "Invalid Date") {
        this.eDate = undefined
      }
      if (campaignsScheduleData?.activeDays?.indexOf('All') > -1) {
        this.allDaysCheckedChange();
      } else {
        for (let i = 0; i < this.daysCheckbox.length; i++) {
          if (
            campaignsScheduleData?.activeDays?.indexOf(
              this.daysCheckbox[i].name
            ) > -1
          ) {
            this.daysCheckbox[i].checked = true;
          }
        }
      }
      this.activedaysEnableCheck();
      this.activeDaysFlag =
        this.daysCheckbox.filter((days) => days.checked)?.length > 0
          ? true
          : false;
      this.fTime = campaignsScheduleData?.formatedStartTime;
      this.tTime = campaignsScheduleData?.formatedEndTime;
      this.formatStart = campaignsScheduleData?.fTime;
      this.formatEnd = campaignsScheduleData?.tTime;
      this.retrySettings = campaignsScheduleData?.callRetry;
      this.noOfRetries = campaignsScheduleData?.noOfRetries;
      this.dRetries = campaignsScheduleData?.dRetries;
      this.selectedDuration = campaignsScheduleData?.durationHrMnt;
      this.startObj.hour = moment(campaignsScheduleData?.formatedStartTime, ["hh:mm A"]).format("hh");
      this.startObj.minutes = moment(campaignsScheduleData?.formatedStartTime, ["hh:mm A"]).format("mm");
      this.startObj.format = moment(campaignsScheduleData?.formatedStartTime, ["hh:mm A"]).format("A");
      this.endObj.hour = moment(campaignsScheduleData?.formatedEndTime, ["hh:mm A"]).format("hh");
      this.endObj.minutes = moment(campaignsScheduleData?.formatedEndTime, ["hh:mm A"]).format("mm");
      this.endObj.format = moment(campaignsScheduleData?.formatedEndTime, ["hh:mm A"]).format("A");
      this.hangupCause.forEach((element:any) => {
        if(campaignsScheduleData?.hangupCause?.includes(element.value)){
          element.checked = true;
        } else{
          element.checked = false;
        }
        
      });
    }else{
      this.fTime = this.currentTime;
    }
    
  }
  
  getDestinationNumber(){
    this.selectedNumbers=[];
    this.createCamp.getDestinationNo().subscribe((getCamp:any)=>{
      if(getCamp.status == 'Success'){
        getCamp.result.forEach((element:any) => {
          this.selectedNumbers.push({'code':'','number':element.leadMobileNo,'otp':'123450',Vmessage:true,'vbutton':false,'otpbutton':false,'leadId':element.leadId})
        });
        
      }
    })
  }

  getDates(e: any, element: any) {
    if (element == 'sDate') {
      this.openDatePicker = !this.openDatePicker;
      this.sDate = moment(e?.start).format('YYYY-MM-DD');
      if (moment(e?.start) > moment(this.eDate)) {
        this.eDate = '';
        this.endObj.hour = '';
        this.endObj.minutes = '';
        this.endObj.format = '';
        return;
      }
    } else {
      this.openEndDatePicker = !this.openEndDatePicker;
      this.eDate = moment(e?.start).format('YYYY-MM-DD');
      if (moment(e?.start) < moment(this.sDate)) {
        this.sDate = '';
        this.startObj.hour = '';
        this.startObj.minutes = '';
        this.startObj.format = '';
        return;
      }
    }

    this.fTime = "";
    this.tTime = "";
    this.activedaysEnableCheck();

  }

  activedaysEnableCheck(){
    if(this.sDate && this.eDate){
      if(moment(this.eDate).diff(moment(this.sDate), 'days') >= 7){
        this.daysCheckbox.map(function(x) { 
          x.disabled = false;
          return x
        });
      }else{
        let days:any = this.createCamp.getDaysNamebetweenDates(this.sDate,this.eDate);
        this.daysCheckbox.forEach(element => {
          if(days.includes(element?.name)){
            element.disabled = false;
          }else{
            element.disabled = true;
            element.checked = false;
          }
        });
        
      }
      
      this.allDaysDisabled = this.daysCheckbox.filter((v:any)=>v.disabled)?.length < 7  && this.daysCheckbox.filter((v:any)=>v.disabled)?.length != 0 ? true : false;
      this.allDaysChecked = this.allDaysDisabled ? false : this.daysCheckbox.every((t) => t.checked) ? true : false;
      if(this.allDaysChecked){
        this.daysCheckbox.map(function(x) { 
          x.disabled = false;
          x.checked = true;
          return x
        });
      }
    }
    this.activeDaysFlag =
      this.daysCheckbox.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  onCalendarClose(element: any) {
    if (element == 'sDate') {
      this.openDatePicker = false;
    } else {
      this.openEndDatePicker = false;
    }

  }
  onCancel() {
    this.closeModal.emit(false)
  }
  onFolderChange(event: any) {
    this.selectedDuration = event.value;
    this.checkToggleValue();

  }

  onProceed() {
    let activeDays = [];
    if (this.allDaysChecked) {
      activeDays.push('All');
    } else {
      for (let i = 0; i < this.daysCheckbox.length; i++) {
        if (this.daysCheckbox[i].checked) {
          activeDays.push(this.daysCheckbox[i].name);
        }
      }
    }
    let selecteddata:any=[];
    this.selectedNumbers.forEach((element:any) => {
    selecteddata.push(element.number)  
    });
    let dataSchedule: any = {
      sDate: this.sDate,
      eDate: this.eDate,
      activeDays: activeDays,
      fTime: this.formatStart,
      tTime: this.formatEnd,
      callRetry: this.retrySettings,
      noOfRetries: this.noOfRetries,
      dRetries: this.dRetries,
      durationHrMnt: this.selectedDuration,
      hangupCause:this.savedHangupcauses.join(", "),
      destinationNumbers:selecteddata,
      formatedStartTime: this.fTime,
      formatedEndTime: this.tTime,
      formattedActiveDays:activeDays.map(string => string.slice(0, 3)),
      immediateFlag:this.immediateFlag
    };
    this.closeModal.emit({ data: dataSchedule })
  }

  allDaysCheckedChange() {
    this.allDaysChecked = !this.allDaysChecked;
    this.daysCheckbox.forEach(
      (currDay) => (currDay.checked = this.allDaysChecked)
    );
    this.activeDaysFlag =
      this.daysCheckbox.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  onDaysCheckboxChange() {
    this.allDaysChecked = this.daysCheckbox.every((t) => t.checked);
    this.activeDaysFlag =
      this.daysCheckbox.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  onretryToggle(event: any) {
    this.retryCheckFlag = false;

    if (event.target.defaultValue == 'true') {
      this.retrySettings = false;
      this.noOfRetries = 0;
      this.dRetries = '';
      this.selectedDuration = '';
      this.savedHangupcauses = [];
    } else {
      this.noOfRetries = 2;
      this.retryCheckFlag = true;
    }
  }

  checkToggleValue() {
    this.dRetries = this.dRetries ? Number(this.dRetries).toString() : '';
    if(parseInt(this.dRetries) == 0){
      this.dRetries = '';
    }
    if (!(this.noOfRetries && this.dRetries && this.selectedDuration && this.savedHangupcauses?.length > 0)) {
      this.retryCheckFlag = true;
    } else {
      this.retryCheckFlag = false;
    }
  }

  onlyNumberKey(event: any) {
    return event.charCode === 8 || event.charCode === 0
      ? null
      : event.charCode >= 47 && event.charCode <= 57;
  }

  datechange(str: any) {
    let fullDate = str ? str.split('-') : '';
    if (fullDate) {
      return moment(new Date(fullDate[0], fullDate[1] - 1, fullDate[2])).format('YYYY-MM-DD');
    } else {
      return '';
    }
  }

  validateTime(type: string) {
    // Update the time value
    this.errorTimeFlag = '';
    var currentDate: any = new Date();
    var startDate = new Date(this.sDate).setHours(0, 0, 0, 0);
    var endDate = new Date(this.eDate).setHours(0, 0, 0, 0);
    var fTimeNew =  this.fTime == 'Now' ? moment(moment(), ["hh:mm A"]).format("HH:mm") : moment(this.fTime, ["hh:mm A"]).format("HH:mm");
    var tTimeNew =  moment(this.tTime, ["hh:mm A"]).format("HH:mm");

    if (startDate == currentDate.setHours(0, 0, 0, 0)) {
      if(type == 'from' && fTimeNew < this.currentTime && this.fTime !== 'Now'){
        this.fTime = '';
      }
    }

    if (endDate == currentDate.setHours(0, 0, 0, 0)) {
      if(type == 'to' && tTimeNew < this.currentTime && this.fTime !== 'Now'){
        this.tTime = '';
      }
    }

    if (endDate == startDate) {
      if(fTimeNew < tTimeNew){
        this.fTime = this.fTime;
        this.tTime = this.tTime; 
      }else{
        this.errorTimeFlag = 'Start time ' + this.fTime + ' should be less than End time ' + this.tTime + ' for same date';
        this.tTime = '';
      }
    }
  }

  getFormattedTime(time: any): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  }

  openDestModal(){
     this.dialogService.open(DestinationNumberComponent, {
      data:{
        selectedNumbers:this.selectedNumbers
      },
      sidebarPosition: '',
      width: '540px',
      close: (reason: any) => {
        if (reason =='Success') {
          this.getDestinationNumber();
          this.dialogService.close();
        }else{
          this.dialogService.close();
        }
        
      },
    });
  }

  getHangupCauses(){
    this.savedHangupcauses= [];
    let causesChecked:any = this.hangupCause.filter((item:any)=> item.checked);
    causesChecked.forEach((ele:any) => {
      this.savedHangupcauses.push(ele.value)
    });
    this.checkToggleValue();
  }

  delete(index:any){
    let countryCodeLength = this.selectedNumbers[index].number?.length - 10;
    this.selectedNumbers[index].actualNumber =  this.selectedNumbers[index].number.substr(countryCodeLength, this.selectedNumbers[index].number?.length);
    let payload: any = {
      "leadId": this.selectedNumbers[index].leadId,
      "mobileNo": this.selectedNumbers[index].actualNumber
    }
    this.createCamp.deleteDestinationNo(payload).subscribe((getCamp:any)=>{
      if(getCamp.status == 'Success'){
        this.selectedNumbers.splice(index,1);
        this.toastservice.showToast({ 'title': getCamp?.result, 'kind': 'success' });
      }else{
        this.toastservice.showToast({ 'title': getCamp?.message, 'kind': 'error' });
      }
    },(error:any)=>{
      this.toastservice.showToast({ 'title': error?.error.message, 'kind': 'error' });
    })
  }

  onTimeClose(element: any) {
    if (element == 'fTime') {
      this.openSTimePicker = false;
    } else {
      this.openTTimePicker = false;
    }
  }

  getTimepicker(event:any, ele:any){
    if (ele == 'fTime') {
    this.openSTimePicker = !this.openSTimePicker;
    if(event.dateType){
      this.fTime = event.hour + ':' + event.minutes + ' ' + event.format; 
      this.startObj.hour = event.hour;
      this.startObj.minutes = event.minutes;
      this.startObj.format = event.format;
    
    }else{
      this.fTime = event.format;
    }
      
    this.validateTime('from');
    
    
    } else if(ele == 'tTime'){
      this.openTTimePicker = !this.openTTimePicker;
      if(event.dateType){
        this.tTime = event.hour + ':' + event.minutes + ' ' + event.format; 
        this.endObj.hour = event.hour;
        this.endObj.minutes = event.minutes;
        this.endObj.format = event.format; 
      
      }else{
        this.tTime = event.format;
      }
      
      this.validateTime('to');
    }
    
    this.formatStart = this.fTime != "Now" ? this.getFulltime(this.fTime) : moment().format("hh:mm A");
    if(this.fTime == "Now"){
      this.immediateFlag = true;
    }else{
      this.immediateFlag = false;
    }
    this.formatEnd = this.getFulltime(this.tTime);
  }

  getFulltime(date:any){
    var d = new Date("1/1/1970 " + date); 
    return String(d.getHours()).padStart(2, "0") + ':' + String(d.getMinutes()).padStart(2, "0"); 
  }
}
