import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-virtual-section',
  templateUrl: './virtual-section.component.html',
  styleUrls: ['./virtual-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VirtualSectionComponent implements OnInit {
  openDropdown: boolean = false;
  @Input() virtualDetails: any;
  @Input() missedChartReport: any;


  constructor() { }


  ngOnInit(): void {

  }


}
