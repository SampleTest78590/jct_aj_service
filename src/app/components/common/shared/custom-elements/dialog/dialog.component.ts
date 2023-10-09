import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit {
  config: any;
  service: any;
  className = '';
  sidebarPosition = '';
  width = '';
  @ViewChild('content', { read: ViewContainerRef }) contentHolder!: ViewContainerRef;
  content: any;
  _id: any;
  constructor(public conpFactRes: ComponentFactoryResolver, private chk: ChangeDetectorRef, public DialogRef: DialogService) { }
  ngAfterViewInit(): void {
    const compRef = this.conpFactRes.resolveComponentFactory(this.content);
    const compInstance: any = this.contentHolder.createComponent(compRef);
    compInstance.instance._id = this._id;
    if(this.config.data){
      Object.keys(this.config.data).forEach((values:any)=>{
        compInstance.instance[values] = this.config.data[values];
      });
    }
   
    if(this.config.sidebarPosition){
      this.sidebarPosition = this.config.sidebarPosition;
    } 
    if(this.config.width){
      this.width = this.config.width;
    } 
    this.chk.detectChanges()
  }

  ngOnInit(): void {
  }
  close() {
    this.DialogRef.close(this._id)
  }
  setup(comp: any, config: any, service: any = {}) {
    this.content = comp;
    this.config = config;
    this.service = service;
  }
}
