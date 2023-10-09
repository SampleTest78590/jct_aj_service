import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-missed-chart-bar',
  templateUrl: './missed-chart-bar.component.html',
  styleUrls: ['./missed-chart-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class MissedChartBarComponent implements OnInit {
  campPieChart: any;
  @Input() missedChartSection: any;
  @Input() selectedCampaign: any;
  backgroundColor = [
    'mint-green',
    'yellow',
    'crimson',
    'sky-blue',
    'violet',
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
