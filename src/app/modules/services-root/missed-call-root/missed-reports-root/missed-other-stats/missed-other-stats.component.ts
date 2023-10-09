import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-missed-other-stats',
  templateUrl: './missed-other-stats.component.html',
  styleUrls: ['./missed-other-stats.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MissedOtherStatsComponent implements OnInit, OnChanges {
  @Input() missedOtherSatsSection: any;
  @Input() selectedCampaign: any;

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() {
  }

}
