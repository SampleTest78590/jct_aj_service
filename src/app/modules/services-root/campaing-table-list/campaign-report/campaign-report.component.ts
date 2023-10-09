import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampaignReportComponent implements OnInit {
  openDropdown: boolean = false;
  durations = [
    { label: 'Today', value: 'Today' },
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Custom', value: 'Custom' },
  ];
  dateRangeStart: any;
  dateRangeEnd: any;
  openDateRangePicker: boolean = false;
  validatedMinDate: any = new Date();
  customDate: any = '';
  inputDate: any;
  campaignReportId: any;
  campPreviewDetails: any;
  campPieChart: any;
  campaignName:any;
  campLinechart: any;
  campaignStatusData: any;
  updatedDateTime:any;
  updatedDate:any;
  updatedTime:any;
  now = moment();
  differencedays:any;
  differenceMin:any
  differenceVal:any;
  backgroundColor: any = [
    '#7AEBD9', //mint-green
    '#F7AB20', //yellow
    '#ED617F', //crimson
    '#89DCFF', //midnight-sky
    '#F680F9', //violet
  ];
  piechartShow: boolean = false;
  nullStateMsg:any = 'This campaign has not yet started.';

  constructor(
    private router: Router,
    private toastSer: ToastService,
    private campReportSer: JctServicesService
  ) { }

  ngOnInit(): void {
    this.campaignReportId = window.history.state.campdata?.campaignId;
    this.campaignStatusData = window.history.state.campdata?.campaignStatus;
    this.campaignName = window.history.state.campdata?.campaignName;
    if(this.campaignStatusData == 'SUSPENDED'){
      this.nullStateMsg = 'This campaign was cancelled.';
    }
    this.getReportData();
  }


  getReportData() {
    this.getCampaignDetails();
    this.getCampaignPieChart();
    this.getCampaignLineChart('T', '', '');
  }

  screenShotDownload(el: HTMLElement) {
    const targetDiv = document.getElementById('targetdiv');
    const headerDiv = document.getElementById('headerHeight')?.offsetHeight;
    const data = document.getElementById('pdfTable');
    const disableDiv = document.getElementById('buttonCapture');
    if (data != null) {

      if (disableDiv !== null) {
        disableDiv.style.display = 'none';
      }

      if (targetDiv !== null) { 
        targetDiv.style.height = '56px'; 
      } 
      el.scrollIntoView({block: 'nearest', inline: 'start'});

      html2canvas(data).then((canvas) => {
        const imgWidth = 195;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        // A4 size page of PDF
        let position = 0;
        pdf.addImage(contentDataURL, 'PNG', 7, 7, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('Report_Detail.pdf'); // Generated PDF
      });
    }
    if (disableDiv !== null) {
      disableDiv.style.display = 'block';
    }
    if (targetDiv !== null) { targetDiv.style.height = '0px'; }
  }

  goBacktoCampaignList() {
    this.router.navigateByUrl('/landing/services/campaign-table');
  }

  customCalendar(event: any) {
    this.customDate = event.label;
    if (event.label === 'Custom') {
      this.openDateRangePicker = true;
    } else if (event.label === 'Last 7 days') {
      this.campLinechart = [];
      this.getCampaignLineChart('W', '', '');
    } else if (event.label === 'Today') {
      this.campLinechart = [];
      this.getCampaignLineChart('T', '', '');
    } else if (event.label === 'Last 30 days') {
      this.campLinechart = [];
      this.getCampaignLineChart('M', '', '');
    } else {
      this.inputDate = '';
      this.dateRangeStart = '';
      this.dateRangeEnd = '';
      this.openDateRangePicker = false;
    }

  }

  getDates(e: any) {
    this.dateRangeStart = e.start;
    this.dateRangeEnd = e.end;
    this.inputDate =
      moment(this.dateRangeStart).format('DD/MM/YYYY') +
      ' - ' +
      moment(this.dateRangeEnd).format('DD/MM/YYYY');
    this.openDateRangePicker = false;
    this.getCampaignLineChart('C',moment(this.dateRangeStart).format('YYYY-MM-DD'),moment(this.dateRangeEnd).format('YYYY-MM-DD'));
  }

  onCalendarClose(event: any) {
    this.openDateRangePicker = false;
  }

  goTodetailReport() {
    let campdataObj = {
      campaignId: this.campaignReportId,
      campaignStatus: this.campPreviewDetails.campaignStatus,
      campaignName: this.campPreviewDetails.campaignName
    }
    this.router.navigate(['/landing/services/campaign-report/report-table'],
    {state: { campdata: campdataObj},},
    );
  }

  getCampaignDetails() {
    let payload: any = {
      campaignId: this.campaignReportId,
      // campaignStatus: this.campaignStatusData
    };
    this.campReportSer.previewCamp(payload).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.campPreviewDetails = result.result[0];
        } else {
          this.toastSer.showToast({ title: result.message, kind: 'error' });
        }
      },
      (error) => {
        this.toastSer.showToast({
          title: error?.error?.message,
          kind: 'error',
        });
      }
    );
  }

  getCampaignPieChart() {
    this.campReportSer.getCampaignPiechart(this.campaignReportId).subscribe(
      (result: any) => {
        if (result.status === 'Success') {
          this.campPieChart = result.result;
          this.campPieChart.campaignCompletetionRate = this.campPieChart?.campaignCompletetionRate.replace(/[%]/g, '');
          this.campPieChart.avgCallPerDay = this.campPieChart['other-stats']?.avgCallPerDay?.toFixed(1) || '-';
          this.campPieChart.avgDuration = this.campPieChart['other-stats']?.avgDuration || '-';
          this.campPieChart.peekHours = this.campPieChart['other-stats']?.peekHours || '-';
          if(this.campPieChart?.failedCallsBreakdown.length == 0){
            this.piechartShow = true;
          }
          this.updatedDateTime = this.campPieChart['last-updated-dateTime']
          if(this.updatedDateTime)
          {
  
          this.updatedDate = moment(this.updatedDateTime).format('DD/MM/YYYY');
          let getDate = moment(this.updatedDateTime).format('YYYY-MM-DD');
          let getTime = moment(this.updatedDateTime);
          
          this.differencedays = Math.abs(this.now.diff( getDate, "days" ));
          if(this.differencedays>1){
          this.differenceVal = this.differencedays + " days"
          }else{
            this.differenceVal = this.differencedays + " day"
          }
          if(this.differencedays === 0)
          {
            this.differenceMin = Math.abs(this.now.diff( getTime, "minutes" ));
            if(this.differenceMin>1)
            {
              this.differenceVal = this.differenceMin + " minutes"
            }
            else{
              this.differenceVal = this.differenceMin + " minute"
            }
          }
        }
        } else {
          this.campPieChart = [];
          this.piechartShow = true;
          this.toastSer.showToast({ title: result.message, kind: 'error' });
        }
        
      },
      (error) => {
        this.campPieChart = [];
        this.piechartShow = true;
        this.toastSer.showToast({
          title: error?.error?.message,
          kind: 'error',
        });
      }
    );
  }

  getCampaignLineChart(chartType: string, sDate: any, edate: any) {
    let obj: any = {
      "campaignId": this.campaignReportId,
      "action": chartType
    };
    if(chartType == 'C'){
      obj.startDate = sDate
      obj.endDate = edate
    }
    this.campReportSer.getLineChart(obj).subscribe(
      (result: any) => {
        if (result.status === 'Success' && result?.result[0]) {
          this.campLinechart = result?.result[0];
        } else {
          this.campLinechart = [];
        }
      },
      (error) => {
        this.campLinechart = [];
        this.toastSer.showToast({
          title: error?.error?.message,
          kind: 'error',
        });
      }
    );
  }
}
