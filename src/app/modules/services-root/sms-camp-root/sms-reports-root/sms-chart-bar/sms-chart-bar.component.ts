import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-sms-chart-bar',
  templateUrl: './sms-chart-bar.component.html',
  styleUrls: ['./sms-chart-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class SMSChartBarComponent implements OnInit {
  campPieChart: any;
  @Input() missedChartSection: any;
  @Input() selectedCampaign: any;
  backgroundColor = [
    'mint-green',
    'yellow',
    'sky-blue',
    'crimson',
    'violet',
  ]
  piechartColor = [
    '#7AEBD9',
    '#F7AB20',
    '#89DCFF',
    '#ED617F'
  ]
  missedChartSectionData: any;


  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.missedChartSection) {
      this.missedChartSectionData = JSON.parse(JSON.stringify(this.missedChartSection));
    }
  }

}
