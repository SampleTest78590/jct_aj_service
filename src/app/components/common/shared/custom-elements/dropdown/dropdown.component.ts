import {
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { DropDownOption } from './dropdown.model';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges, AfterViewChecked {
    @ViewChild('dropdownContainer') dropdownContainerRef?: ElementRef;
    @ViewChild('dropdownOptions') dropdownOptionsRef?: ElementRef;

    @Input() className?: string = '';
    @Input() label?: string;
    @Input() placeholder?: string;
    @Input() value?: string | null = '';
    @Input() isOpen: boolean = false;
    @Input() options: DropDownOption[] = [];
    @Input() disabled: boolean = false;
    @Input() bindLabel = 'name';
    @Input() bindValue = 'id';
    @Input() detectChangeEverytime:boolean = true;
    @Input() isPositionAboslute = false;
    @Input() displayValue:boolean = false;
    @Input() AddButton: boolean = false;

    @Output() handleChange: EventEmitter<DropDownOption> = new EventEmitter();
    @Output() handleChangebutton: EventEmitter<any> = new EventEmitter();

    private documentClickListener: () => void;

    private previousValue: string;
    private isOptionvisible: boolean = false;

    selectedLabel: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['value'] &&
            changes['value']?.currentValue !== changes['value']?.previousValue
        ) {
            this.previousValue = changes['value'].currentValue;
        }

        if (changes['options'] && changes['options']?.currentValue?.length) {
            this.handleSelectValue();
        }

        if (
            changes['open'] &&
            changes['open']?.currentValue !== changes['open']?.previousValue
        ) {
            this.handleDocumentListener();
        }
    }

    ngOnInit(): void { }

    ngAfterViewChecked(): void {
        if (
            this.isOpen &&
            this.dropdownOptionsRef?.nativeElement &&
            !this.isOptionvisible
        ) {
            const offSet = 20;

            const containerEle = this.dropdownContainerRef?.nativeElement;
            const optionsEle = this.dropdownOptionsRef?.nativeElement;

            const containerRect = containerEle?.getBoundingClientRect();

            const optionsRect = optionsEle?.getBoundingClientRect();

            const windowInnerHeight = window.innerHeight;

            const position: any = {};

            if (
                containerRect.bottom + optionsRect.height + offSet >
                windowInnerHeight
            ) {
                position.bottom = windowInnerHeight - containerRect.top;
                position.left = containerRect.left;
            } else {
                position.bottom =
                    windowInnerHeight -
                    containerRect.bottom -
                    optionsRect.height;
                position.left = containerRect.left;
            }

            if(!this.isPositionAboslute){
                this.renderer.setStyle(
                    this.dropdownOptionsRef.nativeElement,
                    'bottom',
                    position.bottom + 'px'
                );

                this.renderer.setStyle(
                    this.dropdownOptionsRef.nativeElement,
                    'left',
                    position.left + 'px'
                );
            }else{
                    this.renderer.setStyle(
                        this.dropdownOptionsRef.nativeElement, 'position','absolute'
                    )
                }

            this.renderer.setStyle(
                this.dropdownOptionsRef.nativeElement,
                'width',
                containerRect.width + 'px'
            );

            this.renderer.setStyle(
                this.dropdownOptionsRef.nativeElement,
                'visibility',
                'visible'
            );

            this.isOptionvisible = true;
        }
    }

    handleSelectValue() {
        this.selectedLabel =
            this.options.find((option) => option.value === this.value)?.label ||
            '';
        if (!this.selectedLabel) {
            this.value = '';
            this.previousValue = '';
        }
    }

    openDropdown() {
        this.isOpen = !this.isOpen;
        this.handleDocumentListener();
    }

    handleDocumentListener() {
        if (this.isOpen) {
            this.documentClickListener = this.renderer.listen(
                'document',
                'click',
                (event: Event) => {
                    if (!this.el.nativeElement.contains(event.target)) {
                        this.closeDropdown();
                    }
                }
            );
        } else {
            this.closeDropdown();
        }
    }

    closeDropdown() {
        this.isOpen = false;
        this.isOptionvisible = false;
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

    onOptionClick(event: DropDownOption) {
        this.value = event.value;
        this.selectedLabel = event.label;
        this.closeDropdown();
        if(this.detectChangeEverytime){
            if (this.value !== this.previousValue && this.handleChange.observed) {
                this.handleChange.emit(event);
            }
        }else{
            this.handleChange.emit(event);
        }
        
        this.previousValue = this.value;
    }

    addnewActivity(event:any){
        this.handleChangebutton.emit(event);
    }
}
