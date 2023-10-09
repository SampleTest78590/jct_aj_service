import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { JctmissedReportService } from './jctmissed-report.service';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastService } from '../../../../components/common/shared/custom-elements/custom-toast/toast-service.service';

@Component({
  selector: 'app-missed-reports-root',
  templateUrl: './missed-reports-root.component.html',
  styleUrls: ['./missed-reports-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class MissedReportsRootComponent implements OnInit, OnDestroy {
  visibleCampaigns = false;
  campaignData: any;

  missedChartbar: any;
  virtualSection: any;
  selectedCampaign: any = {};
  campaignList: any = [];
  campaignListClone: any = [];
  filterTime = 'T';
  customDate: any = '';
  inputDate: any;
  dateRangeStart: any;
  dateRangeEnd: any;
  openDateRangePicker: boolean = false;
  updatedDateTime: any;
  differenceVal: any;
  durations = [
    { label: 'Till Now', value: 'N' },
    { label: 'Today', value: 'T' },
    { label: 'Last 7 days', value: 'W' },
    { label: 'Last 30 days', value: 'M' },
    { label: 'Custom', value: 'C' },
  ];
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.visibleCampaigns = false;
  }
  constructor(
    private router: Router,
    public missedChartSectionService: JctmissedReportService,
    public toastservice: ToastService
  ) { }

  ngOnInit(): void {
    this.selectedCampaign = this.missedChartSectionService.selectedCampaign;
    this.getCampaignList();
    if (!!this.selectedCampaign?.campaignId) {
      this.missedSummary();
      this.virtualReport();
    }
  }
  getCampaignList() {
    this.missedChartSectionService.getCampaignList().subscribe((res: any) => {
      this.campaignList = res.result;
      this.campaignListClone = [...res.result];
    });
  }

  customCalendar(event: any) {
    this.filterTime = event.value;
    if (this.filterTime == 'C') {
      this.openDateRangePicker = true;
    } else {
      this.missedSummary();
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
    this.missedSummary();
    // this.getCampaignLineChart('C',moment(this.dateRangeStart).format('YYYY-MM-DD'),moment(this.dateRangeEnd).format('YYYY-MM-DD'));
  }

  onCalendarClose(event: any) {
    this.openDateRangePicker = false;
  }

  show() {
    this.visibleCampaigns = !this.visibleCampaigns;
  }

  screenShotDownload(el: HTMLElement) {
    const targetDiv = document.getElementById('targetdiv');
    const pageBreakDiv = document.getElementById('pageBreakDiv');
    const data = document.getElementById('pdfTable');
    const disableDiv = document.getElementById('myDropdown');
    if (data != null) {
      if (disableDiv !== null) {
        disableDiv.style.display = 'none';
      }

      if (targetDiv !== null) {
        targetDiv.style.height = '56px';
      }
      if (pageBreakDiv !== null) {
        pageBreakDiv.style.height = '450px';
      }

      el.scrollIntoView({ block: 'nearest', inline: 'start' });

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
        this.toastservice.showToast({
          title: 'Report Downloaded Successfully',
          kind: 'success',
        });
      });
    }
    if (disableDiv !== null) {
      disableDiv.style.display = 'block';
    }
    if (targetDiv !== null) {
      targetDiv.style.height = '0px';
    }
    if (pageBreakDiv !== null) {
      pageBreakDiv.style.height = '0px';
    }
  }

  onSearch(event: any) {

    this.campaignList = this.onSearchFilter(
      event,
      this.campaignListClone,
      'campaignName'
    );

  }

  onSearchFilter(event: any, list: any, findingObj: any) {
    let filteredItem: any = [];
    const filterValue = event.toLowerCase();

    if (filterValue.length > 0) {
      filteredItem = list.filter(
        (option: any) =>
          option[findingObj]?.toLowerCase().indexOf(filterValue) >= 0
      );
    } else {
      filteredItem = list;
    }
    return filteredItem;
  }
  goTodetailReport() {
    this.router.navigate(['/landing/services/missed-reports/reports-details']);
  }

  virtualReport() {
    let payload: any = {
      campaignId: this.selectedCampaign?.campaignId,
    };
    this.missedChartSectionService
      .virtualSection(payload)
      .subscribe((res: any) => {
        if (res.status === 'Success') {
          this.virtualSection = res.result[0];
          this.missedChartSectionService.reportDetailData = this.virtualSection;
          // this.missedChartSectionService.selectedCampaign.status = this.virtualSection.status;
        }
      });
  }

  missedSummary() {
    let payload: any = {
      campaignId: this.selectedCampaign?.campaignId,
      action: this.filterTime,
    };
    if (this.filterTime == 'C') {
      payload.startDate = moment(this.dateRangeStart).format('YYYY-MM-DD');
      payload.endDate = moment(this.dateRangeEnd).format('YYYY-MM-DD');
    }
    this.missedChartSectionService.missedSummary(payload).subscribe(
      (res: any) => {
        if (res.result?.length) {
          this.missedChartbar = res.result[0];
          if(this.missedChartbar?.smsReport){
            this.selectedCampaign.smsReport=this.missedChartbar?.smsReport;
          }
          this.updatedDateTime = this.missedChartbar['dateTime'];
          if (this.updatedDateTime) {
            // this.updatedDate = moment(this.updatedDateTime).format('DD/MM/YYYY');
            let getDate = moment(this.updatedDateTime).format('YYYY-MM-DD');
            let getTime = moment(this.updatedDateTime);

            let differencedays = Math.abs(moment().diff(getDate, 'days'));
            if (differencedays > 1) {
              this.differenceVal = differencedays + ' days';
            } else {
              this.differenceVal = differencedays + ' day';
            }
            if (differencedays === 0) {
              let differenceMin = Math.abs(moment().diff(getTime, 'minutes'));
              if (differenceMin > 1) {
                this.differenceVal = differenceMin + ' minutes';
              } else {
                this.differenceVal = differenceMin + ' minute';
              }
            }
          }
        } else {
          this.missedChartbar = {};
        }
      },
      (error: any) => {
        this.missedChartbar = {};
      }
    );
    this.visibleCampaigns = false;
  }

  calculateHeight(listLength: number): string {
    if (listLength > 4) {
      return '200px'
    } else {
      return listLength * 40 + 'px'
    }
  }

  goToMissedCamp() {
    this.router.navigate(['/landing/services/missed-call'],
      { state: { CampFlag: 'C' }, },
    );

  }

  ngOnDestroy() {
  }
}
