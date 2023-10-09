import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lead-list-preview',
  templateUrl: './lead-list-preview.component.html',
  styleUrls: ['./lead-list-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeadListPreviewComponent implements OnInit {

  @Input() data: any;
  @Output() closeModal = new EventEmitter();
  @Input() leadName:any;

  constructor() { }

  ngOnInit(): void {
    
    
  }

  onCancel() {
    this.closeModal.emit(false);
  }

}
