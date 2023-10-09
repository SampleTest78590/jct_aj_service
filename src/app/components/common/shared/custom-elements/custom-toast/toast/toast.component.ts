import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from '../toast-service.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    @Output() toastDestroy: EventEmitter<any> = new EventEmitter<any>();

    position: string = '';
    kind: string = '';
    title: string = '';
    description: string = '';
    kindIconMap: string = '';
    kindIconMapData: any = {
        default: 'assets/images/svg/notification-off.svg',
        info: 'assets/images/svg/info.svg',
        warning: 'assets/images/svg/ico-toast-warning.svg',
        error: 'assets/images/svg/ico-toast-error.svg',
        success: 'assets/images/svg/ico-toast-success.svg',
    };

    toastStyles: any = {};

    constructor(public toastSer:ToastService) {}

    ngOnInit(): void {}

    closeToasterMsg(){
        this.toastSer.destroyInstance();
    }
    
}
