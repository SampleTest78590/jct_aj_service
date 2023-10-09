import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-choose-sms-template',
  templateUrl: './choose-sms-template.component.html',
  styleUrls: ['./choose-sms-template.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class ChooseSMSTemplateComponent implements OnInit {
  // entityid:this.entityId,
  // senderId:this.selectedSendorId  ,
  searchValue: any = '';
  @Input() entityid: any = '';
  @Input() senderId:any = '';
  @Input() gettingstarted:any = '';
  @Input() alreadyselected:any = '';
  
  templateSms = [];
  datasendback:any;
  textRadioSelected :any;
  selectedSendorId:any;
  nochangetext:any;
  openFilterData: boolean = false;
  smsLanguageArray: any = [];
  smsTypeArray: any = [];
  onHoverSmsType: boolean = false;
  onHoverSmsLang: boolean = false;
  selectedSmsLang: any = [];
  selectedSmsType: any = [];
  filterCount: number;
    constructor(private dialogRefSelf: DialogService,
    private misscallservice: JctMisscallService,private toastservice: ToastService) { }

  @HostListener('document:click') clickOutside(){
    this.openFilterData = false;
  }

  ngOnInit(): void {
    this.getsmstemplate();
    if(this.senderId === this.gettingstarted?.feedbackSMS?.senderId)
    {
      this.nochangetext = this.gettingstarted?.feedbackSMS?.smsTemplateText;
    }else{
      this.nochangetext = '';
    }
    this.textRadioSelected =  this.alreadyselected? this.alreadyselected:this.nochangetext;
    this.getSmsLang();
    this.getSmsType();
  }
  // sms language filter api call
  getSmsLang(){
    this.smsLanguageArray = [];
    this.misscallservice.getSmsLanguage({}).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success'){
          this.smsLanguageArray = res?.result;
        }else{
          this.toastservice.showToast({ 'title': res?.message, 'kind': 'error' });
        }
      },
      error: (err: any) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    })
  }
  // sms type filter api call
  getSmsType(){
    this.smsTypeArray = [];
    this.misscallservice.getSmsType({}).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success'){
          this.smsTypeArray = res?.result;
        }else{
          this.toastservice.showToast({ 'title': res?.message, 'kind': 'error' });
        }
      },
      error: (err: any) => {
        this.toastservice.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    })
  }
  onCancel() {
    this.dialogRefSelf.close();
  }
  outputSearch(event: any) {
    this.textRadioSelected = '';
    this.searchValue = event;
    this.applyFilter();
  }
  applyFilter() {
    // this.initialflag = false;
    if (this.searchValue?.length > 2) {
      // this.pageIndex = 1;
      // this.pageSize = 7;
      this.getsmstemplate();
    } else if (this.searchValue?.length == 0) {
      //   this.pageIndex = 1;
      this.getsmstemplate();
    }
  }
  getsmstemplate() {
    this.templateSms =[];
    let payload: any = {
      "entityId": this.entityid,
      "senderId": this.senderId,
      "search": this.searchValue,
      'smsType': this.selectedSmsType,
      'smsLanguage': this.selectedSmsLang
    };
    this.misscallservice.getSmsTemp(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.templateSms = result?.result?.data;
        } else {
          // this.toastservice.showToast({ 'title': 'No Data found', 'kind': 'error' });
        }
      },
      (error) => {
        this.toastservice.showToast({ 'title': error?.error?.message, 'kind': 'error' });
      }
    );
  }
  chooseText(text:any){
    this.datasendback = text;
  }
  SelectAndBack(){
    this.datasendback.entityId = this.entityid;
    this.dialogRefSelf.close(this.datasendback);
  }
  openFilterModal(e: any){
    e.stopPropagation();
    this.openFilterData = !this.openFilterData;
  }
  closeFilterModal(){
    this.openFilterData = false;
  }
  isSelected(val: string, flag: string){
    if (flag === 'lang') return this.selectedSmsLang.includes(val);
    else return this.selectedSmsType.includes(val);
  }
  selectMultiple(val: string, flag: string){
    if (flag === 'lang'){
      if (this.isSelected(val, flag)){
        this.selectedSmsLang = this.selectedSmsLang.filter( (e: any) => e !== val);
      }else{ 
        this.selectedSmsLang.push(val);
      }
    }else{
      if (this.isSelected(val, flag)){
        this.selectedSmsType = this.selectedSmsType.filter( (e: any) => e !== val);
      }else{ 
        this.selectedSmsType.push(val);
      }
    }
    this.filterCount = (this.selectedSmsLang?.length>0?1:0) +(this.selectedSmsType?.length>0?1:0);
    this.getsmstemplate();
  }
  clearAll(){
    if (this.selectedSmsLang?.length || this.selectedSmsType?.length){
      this.selectedSmsLang = [];
      this.selectedSmsType = [];
      this.filterCount = 0;
      this.getsmstemplate();
    }
  }
}
