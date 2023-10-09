import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sms-other-stats',
  templateUrl: './sms-other-stats.component.html',
  styleUrls: ['./sms-other-stats.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SMSOtherStatsComponent implements OnInit, OnChanges {
  @Input() missedOtherSatsSection: any;
  @Input() selectedCampaign: any;

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() {
  }

}
