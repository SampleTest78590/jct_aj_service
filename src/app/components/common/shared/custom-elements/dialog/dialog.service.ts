import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { JctServicesService } from '../../../services/jctservices.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private counter: number = 1;
  public dialog: any = [];
  compInstance: any;

  constructor(
    private compFactRes: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    public welcomservice: JctServicesService,
  ) {
    
  }

  open(comp: any, config: any) {
    // this.dialog = [];
    const compRef = this.compFactRes
      .resolveComponentFactory(DialogComponent)
      .create(this.injector);
    this.compInstance = this.compFactRes
      .resolveComponentFactory(comp)
      .create(this.injector);
    const id = this.compInstance.componentType.name + this.counter++;

    compRef.instance._id = id;

    compRef.instance.setup(comp, config, this);
    const modalConfig: any = { compRef: compRef, hostView: compRef.hostView };
    if (config.messagePushed) {
      modalConfig.messagePushed = config.messagePushed;
    }
    if (config.close) {
      modalConfig.onClose = config.close;
    }
    this.dialog.push(modalConfig);
    // this.welcomservice.dialogdata = [...this.dialog];
    this.appRef.attachView(compRef.hostView);
    const ele = (compRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(ele);
  }
  close(data: any = null) {
    let modalCloseIndex = this.dialog.length - 1;
    
    // if(modalCloseIndex === -1){
    //   let dialogdata = this.welcomservice.dialogdata;
    //   this.dialog = dialogdata;
    //   modalCloseIndex = 0;
    // }

    if (modalCloseIndex > -1) {
      this.dialog[modalCloseIndex].compRef.destroy();
      this.appRef.detachView(this.dialog[modalCloseIndex].hostView);
      if (this.dialog[modalCloseIndex]?.onClose) {
        this.dialog[modalCloseIndex].onClose(data);
      }
      if (this.dialog[modalCloseIndex - 1]?.messagePushed && modalCloseIndex) {
        this.dialog[modalCloseIndex - 1].messagePushed();
      }
      this.dialog.pop();
    }
  }

  onMessagePush(data: any = null) {
    let modalCloseIndex = this.dialog.length - 1;
    if (modalCloseIndex > -1) {
      this.dialog[modalCloseIndex].messagePushed(data);
    }
  }
}
