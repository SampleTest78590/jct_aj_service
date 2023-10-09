import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-custom-modal',
    templateUrl: './custom-modal.component.html',
    styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
    @Input() isModalOpen: boolean = false;
    @Input() isClosable: boolean = true;
    @Input() className: string = '';
    @Output() closeCallback = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    closeModal() {
        this.isModalOpen = false;
        this.closeCallback.emit({ state: this.isModalOpen });
    }
}
