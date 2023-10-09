import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-number-sms-section',
  templateUrl: './number-sms-section.component.html',
  styleUrls: ['./number-sms-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NumberSmsSectionComponent implements OnInit, OnChanges {

  @Input() smsEmptyStateMsg: boolean = false;
  noOfSMS = false;
  @Input() chartsData: any = {}
  smsChartData: any = {};
  smsTable: any = [];
  @Input() dropDownValue: string;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.smsTable = [];
    this.smsChartData = {}
    if (this.chartsData?.smsReport) {
      this.smsChartData = {
        labels: this.chartsData.label,
        data: this.chartsData.smsReport,
      };
      this.chartsData[this.dropDownValue === 'T'?'label1':'label']?.forEach((element: any, index: any) => {
        this.smsTable.push({
          time: element,
          smsCount: this.chartsData.smsReport[index],
        })
      })
    }
  }


}
