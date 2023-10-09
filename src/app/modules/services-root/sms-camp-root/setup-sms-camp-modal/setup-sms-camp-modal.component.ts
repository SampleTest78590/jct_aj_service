import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-setup-sms-camp-modal',
  templateUrl: './setup-sms-camp-modal.component.html',
  styleUrls: ['./setup-sms-camp-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupSmsCampModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() getstartData: any = '';
  @Input() flagSMS: boolean = false;
  @Input() gettingFlag: boolean = false;
  openDatePickerSMS = false;
  openEndDatePickerSMS = false;
  openSTimePickerSMS = false;
  openTTimePickerSMS = false;
  daysCheckboxSMS = [
    {
      name: 'Sunday',
      checked: false,
      disabled: true
    },
    {
      name: 'Monday',
      checked: false,
      disabled: true
    },
    {
      name: 'Tuesday',
      checked: false,
      disabled: true
    },
    {
      name: 'Wednesday',
      checked: false,
      disabled: true
    },
    {
      name: 'Thursday',
      checked: false,
      disabled: true
    },
    {
      name: 'Friday',
      checked: false,
      disabled: true
    },
    {
      name: 'Saturday',
      checked: false,
      disabled: true
    },
  ];
  durations = [
    { label: 'hrs', value: 'hrs' },
    { label: 'min', value: 'min' }];
  startObjSMS: any = {};
  endObjSMS: any = {};
  nowSMS: any = new Date().toISOString().slice(0, 10);
  immediateFlagSMS: boolean = false;
  sDateSMS: any;
  eDateSMS: any;
  fTimeSMS: any;
  tTimeSMS: any;
  allDaysCheckedSMS: boolean = false;
  activeDaysFlagSMS: boolean = false;
  validatedMinDateSMS: any = new Date();
  smsCampaignType: any = '1';
  apiKeyAvailable: any;
  allDaysDisabledSMS: boolean = true;
  formatStartSMS: any;
  formatEndSMS: any;
  currentTimeSMS: any = moment(new Date).add(15, 'minutes').format('HH:mm');
  errorTimeFlagSMS: any = '';
  proceedObj: any = {};


  constructor(private dialogRefSelf: DialogService, private toastservice: ToastService, private smscampservice: JctSmsService,
    private setupSchedule: JctServicesService, private route: Router) { }

  ngOnInit(): void {
    if (this.getstartData?.campaignSchedule) {
      this.smsCampaignType = this.getstartData?.campaignSchedule?.campaignType === 'schedule' ? '1' : '2';
     if(this.smsCampaignType === '1')
     {
      this.sDateSMS = this.getstartData?.campaignSchedule?.startDate;
      this.eDateSMS = this.getstartData?.campaignSchedule?.endDate;
      this.fTimeSMS = moment(this.getstartData?.campaignSchedule.startTime, ["HH.mm"]).format("hh:mm A");
      this.tTimeSMS = moment(this.getstartData?.campaignSchedule.endTime, ["HH.mm"]).format("hh:mm A");
      this.startObjSMS.hour = moment(this.getstartData?.campaignSchedule?.startTime, ["hh:mm"]).format("hh");
      this.startObjSMS.minutes = moment(this.getstartData?.campaignSchedule?.startTime, ["hh:mm"]).format("mm");
      this.startObjSMS.format = moment(this.getstartData?.campaignSchedule?.startTime, ["hh:mm"]).format("A");
      this.endObjSMS.hour = moment(this.getstartData?.campaignSchedule?.endTime, ["hh:mm"]).format("hh");
      this.endObjSMS.minutes = moment(this.getstartData?.campaignSchedule?.endTime, ["hh:mm"]).format("mm");
      this.endObjSMS.format = moment(this.getstartData?.campaignSchedule?.endTime, ["hh:mm"]).format("A");
    
      if (this.getstartData?.campaignSchedule?.activeDays?.indexOf('All') > -1) {
        this.allDaysCheckedChange();
      } else {
        for (let i = 0; i < this.daysCheckboxSMS.length; i++) {
          if (
            this.getstartData?.campaignSchedule?.activeDays?.indexOf(
              this.daysCheckboxSMS[i].name
            ) > -1
          ) {
            this.daysCheckboxSMS[i].checked = true;
          }
        }
      }
      this.activedaysEnableCheck();
     }else if (this.smsCampaignType === '2'){
      this.getAPIKey();
     }
      // this.activeDaysFlag =
      //   this.daysCheckboxSMS.filter((days) => days.checked)?.length > 0
      //     ? true
      //     : false;

      // let activeDaysSMS = [];
      // if (this.allDaysCheckedSMS) {
      //   activeDaysSMS.push('All');
      // } else {
      //   this.daysCheckboxSMS.forEach((element: any) => {
      //     if (element.checked) {
      //       activeDaysSMS.push(element.name);
      //     }
      //   });
      // }

      // activeDaysSMS = this.getstartData?.campaignSchedule?.activeDays;
     
    }
  }

  getDates(e: any, element: any) {
    if (element == 'smsSDate') {
      this.openDatePickerSMS = !this.openDatePickerSMS;
      this.sDateSMS = moment(e?.start).format('YYYY-MM-DD');
      if (moment(e?.start) > moment(this.eDateSMS)) {
        this.eDateSMS = '';
        this.endObjSMS.hour = '';
        this.endObjSMS.minutes = '';
        this.endObjSMS.format = '';
        return;
      }
    } else {
      this.openEndDatePickerSMS = !this.openEndDatePickerSMS;
      this.eDateSMS = moment(e?.start).format('YYYY-MM-DD');
      if (moment(e?.start) < moment(this.sDateSMS)) {
        this.sDateSMS = '';
        this.startObjSMS.hour = '';
        this.startObjSMS.minutes = '';
        this.startObjSMS.format = '';
        return;
      }
    }

    this.fTimeSMS = "";
    this.tTimeSMS = "";
    this.activedaysEnableCheck();

  }

  activedaysEnableCheck() {
    if (this.sDateSMS && this.eDateSMS) {
      if (moment(this.eDateSMS).diff(moment(this.sDateSMS), 'days') >= 7) {
        this.daysCheckboxSMS.map(function (x) {
          x.disabled = false;
          return x
        });
      } else {
        let days: any = this.setupSchedule.getDaysNamebetweenDates(this.sDateSMS, this.eDateSMS);
        this.daysCheckboxSMS.forEach(element => {
          if (days.includes(element?.name)) {
            element.disabled = false;
          } else {
            element.disabled = true;
            element.checked = false;
          }
        });

      }

      this.allDaysDisabledSMS = this.daysCheckboxSMS.filter((v: any) => v.disabled)?.length < 7 && this.daysCheckboxSMS.filter((v: any) => v.disabled)?.length != 0 ? true : false;
      this.allDaysCheckedSMS = this.allDaysDisabledSMS ? false : true;
      if (this.allDaysCheckedSMS) {
        this.daysCheckboxSMS.map(function (x) {
          x.disabled = false;
          x.checked = true;
          return x
        });
      }
    }
    this.activeDaysFlagSMS =
      this.daysCheckboxSMS.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  onCalendarClose(element: any) {
    if (element == 'smsSDate') {
      this.openDatePickerSMS = false;
    } else {
      this.openEndDatePickerSMS = false;
    }
  }

  allDaysCheckedChange() {
    this.allDaysCheckedSMS = !this.allDaysCheckedSMS;
    this.daysCheckboxSMS.forEach(
      (currDay) => (currDay.checked = this.allDaysCheckedSMS)
    );
    this.activeDaysFlagSMS =
      this.daysCheckboxSMS.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  onDaysCheckboxChange() {
    this.allDaysCheckedSMS = this.daysCheckboxSMS.every((t) => t.checked);
    this.activeDaysFlagSMS =
      this.daysCheckboxSMS.filter((days) => days.checked)?.length > 0
        ? true
        : false;
  }

  getTimepicker(event: any, ele: any) {
    if (ele == 'fTimeSMS') {
      this.openSTimePickerSMS = !this.openSTimePickerSMS;
      if (event.dateType) {
        this.fTimeSMS = event.hour + ':' + event.minutes + ' ' + event.format;
        this.startObjSMS.hour = event.hour;
        this.startObjSMS.minutes = event.minutes;
        this.startObjSMS.format = event.format;

      } else {
        this.fTimeSMS = event.format;
      }

      this.validateTime('from');

    } else if (ele == 'tTimeSMS') {
      this.openTTimePickerSMS = !this.openTTimePickerSMS;
      if (event.dateType) {
        this.tTimeSMS = event.hour + ':' + event.minutes + ' ' + event.format;
        this.endObjSMS.hour = event.hour;
        this.endObjSMS.minutes = event.minutes;
        this.endObjSMS.format = event.format;

      } else {
        this.tTimeSMS = event.format;
      }

      this.validateTime('to');
    }

    this.formatStartSMS = this.fTimeSMS != "Now" ? this.getFulltime(this.fTimeSMS) :  moment(new Date(), 'hh:mm A').format('HH:mm');
    if (this.fTimeSMS == "Now") {
      this.immediateFlagSMS = true;
    } else {
      this.immediateFlagSMS = false;
    }
    this.formatEndSMS = this.getFulltime(this.tTimeSMS);
  }

  getFulltime(date: any) {
    var d = new Date("1/1/1970 " + date);
    return String(d.getHours()).padStart(2, "0") + ':' + String(d.getMinutes()).padStart(2, "0");
  }

  validateTime(type: string) {
    // Update the time value
    this.errorTimeFlagSMS = '';
    var currentDate: any = new Date();
    var startDate = new Date(this.sDateSMS).setHours(0, 0, 0, 0);
    var endDate = new Date(this.eDateSMS).setHours(0, 0, 0, 0);
    var fTimeNew = this.fTimeSMS == 'Now' ? moment(moment(), ["hh:mm A"]).format("HH:mm") : moment(this.fTimeSMS, ["hh:mm A"]).format("HH:mm");
    var tTimeNew = moment(this.tTimeSMS, ["hh:mm A"]).format("HH:mm");

    if (startDate == currentDate.setHours(0, 0, 0, 0)) {
      if (type == 'from' && fTimeNew < this.currentTimeSMS && this.fTimeSMS !== 'Now') {
        this.fTimeSMS = '';
      }
    }

    if (endDate == currentDate.setHours(0, 0, 0, 0)) {
      if (type == 'to' && tTimeNew < this.currentTimeSMS && this.fTimeSMS !== 'Now') {
        this.tTimeSMS = '';
      }
    }

    if (endDate == startDate) {
      if (fTimeNew < tTimeNew) {
        this.fTimeSMS = this.fTimeSMS;
        this.tTimeSMS = this.tTimeSMS;
      } else {
        this.errorTimeFlagSMS = 'Start time ' + this.fTimeSMS + ' should be less than End time ' + this.tTimeSMS + ' for same date';
        this.tTimeSMS = '';
      }
    }
  }

  getFormattedTime(time: any): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  }

  onTimeClose(element: any) {
    if (element == 'fTimeSMS') {
      this.openSTimePickerSMS = false;
    } else {
      this.openTTimePickerSMS = false;
    }
  }

  proceedSMSContent() {
    let activeDaysSMS = [];
    let payload:any = {};
    if (this.allDaysCheckedSMS) {
      activeDaysSMS.push('All');
    } else {
      this.daysCheckboxSMS.forEach((element: any) => {
        if (element.checked) {
          activeDaysSMS.push(element.name);
        }
      });
    }
    let typecamp = this.smsCampaignType === '1' ? 'schedule' : 'ondemand';
 
    let payloadS: any = {
        "campaignType": typecamp, // ondemand
        "startDate": this.sDateSMS,
        "endDate": this.eDateSMS,
        "activeDays": activeDaysSMS, 
        "startTime": this.formatStartSMS,
        "endTime": this.formatEndSMS,
      
    }
    let payloadOndemand: any = {
       "campaignType": typecamp, // ondemand
    }
    if(this.smsCampaignType === '1')
    {
      payload.campaignSchedule = payloadS;
      if(this.immediateFlagSMS){
        payload.campaignSchedule.immediate = true;
      }
    }else{
      payload.campaignSchedule = payloadOndemand
    }
    if (this.gettingFlag) {
      payload.gettingStarted = this.gettingFlag;
    }
    if (this.getstartData?.campaignData?.campaignId) {
      payload.campaignId = this.getstartData?.campaignData?.campaignId;
    }
    if (this.getstartData?.journeyId) {
      payload.journeyId = this.getstartData?.journeyId;
    }

    this.smscampservice.createSmsCampaign(payload).subscribe(
      (resp: any) => {
        if (resp.status == 'Success') {

          this.toastservice.showToast({ 'title': resp.message, 'kind': 'success' });
          this.dialogRefSelf.close(resp);
        } else {
          this.toastservice.showToast({ 'title': resp.message, 'kind': 'error' });
          this.dialogRefSelf.close();
        }
      },
      (err) => {
        this.dialogRefSelf.close();
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )
  }

  getAPIKey() {
    this.smscampservice.previewAPIKey().subscribe((key: any) => {
      if (key.status == 'Success' && key.result && key.result?.length > 0) {
        this.apiKeyAvailable = key?.result[0]?.apiKey;
      } else {
        this.apiKeyAvailable = '';
      }
    }, (err) => {
      this.apiKeyAvailable = '';
    });
  }

  routetoAPISetting() {
    this.dialogRefSelf.close();
    this.route.navigateByUrl('/landing/settings/api');
    this.route.navigate(['/landing/settings/api'], { state:{ redirectAllow: true}
        // queryParams: { campaignId: element.campaignId },
      });
  }

  onCancel() {
    this.dialogRefSelf.close();
  }

}
