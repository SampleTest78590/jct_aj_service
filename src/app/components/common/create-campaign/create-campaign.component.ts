import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from '../shared/custom-elements/custom-toast/toast-service.service';
import { Router } from '@angular/router';
import { DialogService } from '../shared/custom-elements/dialog/dialog.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  CampDescription: any;
  CampName: any;
  radioSelected: any;
  camptype: any;
  callerIdShow: boolean = false;
  displayedColumns: string[] = ['contactNumbers'];
  dataSourceOne: any;
  dataSourceTwo: any;
  callerData: any;
  callerDataFilter: any;
  contactSelected: any ={number:''};
  callerIdRadioSelect: any ={number:''};
  @Output() closeModal = new EventEmitter();
  @Input() data: any;
  preKycFlag: boolean;
  categoryList: any = [];
  selectedcategory: any = '';
  @Input() gettingstartedData: any = ''
  @Input() createCampData: any;
  constructor(public createCamp: JctServicesService, private toastSer: ToastService, private router: Router, private dialogSer: DialogService) { }

  ngOnInit(): void {
    this.preKycFlag = this.createCamp.preKycFlag;
    // this.createCamp.selectedcategory = '';
    this.getCampaignCategory();
    if (this.createCampData){
      this.CampName = this.createCampData?.campname;
      this.CampDescription = this.createCampData?.campdesc;
      this.selectedcategory = this.createCampData?.campcateg;
      this.radioSelected = '1';
    }
  }

  openCallerId() {
    this.getCallerIDdata();
  }

  nextLandingPage() {
    this.createCamp.NewCampaignData = {};
    this.createCamp.campaignID = '';
    this.checkCampaignExist();
  }

  setNewCampdata() {
    if (this.radioSelected === '1') {
      this.camptype = "Transactional";
    } else {
      this.camptype = "Promotional";
      this.contactSelected = '';
    }
    let datanew: any = {
      CampType: this.camptype,
      CampName: this.CampName,
      CampDesc: this.CampDescription,
      CallerId: this.contactSelected?.number,
      trialNumber: this.contactSelected?.trial_number,
      campaignCategory: this.selectedcategory
    }
    this.createCamp.NewCampaignData = datanew;


    if (!this.callerIdShow) {
      this.closeModal.emit({ data: datanew })
    }

  }

  getCallerIDdata() {
    this.callerIdRadioSelect.number = this.contactSelected.number;
    let payload: any = {
      "trial_number": true,
      "vnNumber":this.createCamp.preKycFlag ? true : false
    };
    this.createCamp.getCallerId(payload).subscribe({
      next: (result: any) => {
        if (result?.status?.toLowerCase() === "success") {
          this.callerData = [...result?.result];
          this.callerDataFilter = [...result?.result];
          if (this.callerData.length > 0) {
            this.splitData(this.callerData);
          }
          this.callerIdShow = true;
        } else {
          this.callerData = [];
          this.callerDataFilter = [];
          this.toastSer.showToast({ 'title': result?.message, 'kind': 'error' })
        }
      }, 
      error: (error: any) => {
        this.callerData = [];
        this.callerDataFilter = [];
        this.toastSer.showToast({ 'title': 'No Data Available', 'kind': 'error' })
      }
    })
  }

  backtoscreen() {
    this.contactSelected.number = this.callerIdRadioSelect?.number;
    this.contactSelected.trial_number = this.callerIdRadioSelect?.trial_number;
    this.callerIdShow = false;
  }

  onClose() {
    this.callerIdShow = !this.callerIdShow;
    if (this.callerIdShow) {
      this.closeModal.emit(false)
    }

  }

  closeCallerId() {
    this.callerIdShow = false;

  }

  searchCallerId(event: any) {
    let searchdata: any[] = [...this.callerDataFilter];
    searchdata = searchdata.filter((call: any) => call?.number.includes(event));
    this.splitData(searchdata);
  }

  splitData(array: any[]) {
    let middleIndex = Math.ceil(array.length / 2);
    this.dataSourceOne = array.splice(0, middleIndex);
    this.dataSourceTwo = array.splice(-middleIndex);
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

  getCampaignCategory() {
    this.categoryList = [];
    this.createCamp.getCampaignCategory().subscribe((cat: any) => {
      if (cat.status == 'Success') {
        this.categoryList=cat?.result.map((element:any)=>{
          return { label: element, value: element }
        })

      } else {
        this.categoryList = [];
        this.toastSer.showToast({ 'title': cat?.message, 'kind': 'error' })
      }
    }, (error: any) => {
      this.categoryList = [];
      this.toastSer.showToast({ 'title': error?.error?.message, 'kind': 'error' })
    });
  }

  selectCategory(event: any) {
    this.selectedcategory = event?.label;
  }

  checkCampaignExist() {
    let obj: any = {
      "campaignName": this.CampName
    };
    this.createCamp.checkCampaignExist(obj).subscribe((result: any) => {
      if (result.status === "Success") {
        this.setNewCampdata();
      } else {
        this.toastSer.showToast({ 'title': result?.result, 'kind': 'error' })
      }

    }, (error: any) => {
      this.toastSer.showToast({ 'title': error?.error?.message, 'kind': 'error' })
    })
  }
  autogrowtextArea() {
    let textArea = document.getElementById("camptextarea");
    this.createCamp.autogrowtextArea(textArea);
  }
  redirectToVn() {
    if (this.createCamp.preKycFlag) {
      this.dialogSer.close();
      this.router.navigate(['landing/virtualNumber'],
        { state: { CampFlag: this.data ? 'O':'A', noRedirect: true, CampName: this.CampName, CampDescription: this.CampDescription, selectedcategory: this.selectedcategory } });
    }
  }
}
