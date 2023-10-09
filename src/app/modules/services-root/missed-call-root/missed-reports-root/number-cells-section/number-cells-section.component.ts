import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-number-cells-section',
  templateUrl: './number-cells-section.component.html',
  styleUrls: ['./number-cells-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumberCellsSectionComponent implements OnInit, OnChanges {
  @Input() chartsData: any = {};
  noOfCall = false;
  pageIndex: number = 1;
  total: number = 2;
  pageSize: number = 5;
  campLinechart: any;
  callsTable: any = [];
  nullstateMsg: any = '';

  constructor() { }
  ngOnChanges(): void {
    this.callsTable = [];
    if (this.chartsData) {
      this.campLinechart = {
        label: this.chartsData.label,
        dataset1: this.chartsData.totalCalls,
        dataset2: this.chartsData.uniqueCalls,
        dataset3: this.chartsData.repeatedCall,
        borderColor1: '#6D17CE',
        borderColor2: '#0073AD',
        borderColor3: '#FA7D19'
      };
      this.chartsData?.label?.forEach((element: any, index: any) => {
        this.callsTable.push({
          time: element,
          totalCalls: this.chartsData.totalCalls[index],
          uniqueCalls: this.chartsData.uniqueCalls[index],
          repeatedCall: this.chartsData.repeatedCall[index],
        })
      });
      if (!!!this.campLinechart?.dataset1?.length) {
        this.nullstateMsg = 'No Data Available'
      } else {
        this.nullstateMsg = '';
      }
    } else {
      this.campLinechart = [];
    }

  }

  ngOnInit(): void {

  }
  returnPage(event: any) {
    this.pageIndex = event.pageIndex;

  }

}
