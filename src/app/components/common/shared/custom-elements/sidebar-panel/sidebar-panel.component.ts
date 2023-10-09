import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.scss']
})
export class SidebarPanelComponent  {
  @Input() isSidebarOpen: any;
  @Input() sidebarPosition = 'left';
  @Input() className = '';
  @Input() width = '50%';
  @Output() sidebarState = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  closeSidebar() {
    this.isSidebarOpen = false;
    this.sidebarState.emit({ state: this.isSidebarOpen });
}
}
