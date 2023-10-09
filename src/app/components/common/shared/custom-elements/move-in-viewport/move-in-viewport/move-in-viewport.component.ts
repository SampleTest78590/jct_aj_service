import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { getModalPosition, makeClass, Positions } from '../helper';

@Component({
    selector: 'app-move-in-viewport',
    templateUrl: './move-in-viewport.component.html',
    styleUrls: ['./move-in-viewport.component.scss'],
})
export class MoveInViewportComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    /**
     * This determines the element underneath which the menu should open from. `HTMLElement`
     */
    @Input() anchorEl?: HTMLElement;

    /**
     * Position of content `top-start` | `top` | `top-end` | `right-start` | `right` | `right-end` | `bottom-start` | `bottom` | `bottom-end` | `left-start` | `left` | `left-end`
     */
    @Input() position: Positions | string = Positions.bottom;

    @Input() className?: string;

    @Input() offsetObj: any;

    @Input() removeOverlay: boolean = false;

    /**
     * Emitted when there the content is closed
     */
    @Output() closeCb = new EventEmitter<Event>();

    /**
     * Emitted when there the content is scrolled
     */
    @Output() scrollCb = new EventEmitter<Event>();

    @ViewChild('overlayEle') overlayEle: ElementRef<HTMLElement>;
    @ViewChild('contentEle') contentEle: ElementRef<HTMLElement>;

    private documentClickListener: () => void;
    private documentWheelListener: () => void;

    constructor(
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.datePickerPosition(
                this.removeOverlay
                    ? document.querySelector('body')!
                    : this.overlayEle?.nativeElement,
                this.contentEle?.nativeElement
            );
            this.documentClickListener = this.renderer.listen(
                'document',
                'click',
                (event: Event) => {
                    if (!this.el.nativeElement.contains(event.target)) {
                        this.onOverlayClick(event);
                    }
                }
            );

            if (this.removeOverlay) {
                this.documentWheelListener = this.renderer.listen(
                    'document',
                    'wheel',
                    (event: Event) => {
                        this.onScroll(event);
                    }
                );
            }
        });
    }

    ngOnDestroy(): void {
        if (this.documentClickListener) {
            this.documentClickListener();
        }

        if (this.documentWheelListener) {
            this.documentWheelListener();
        }
    }

    get classes(): string {
        return makeClass([
            ...(this.removeOverlay ? [] : ['view-port-overlay']), // prettier
            this.className,
        ]);
    }

    get anchorDomRect(): undefined | DOMRect {
        return this.anchorEl?.getBoundingClientRect();
    }

    datePickerPosition(overlayEle: HTMLElement, contentEle: HTMLElement): void {
        const contentRect = contentEle.getBoundingClientRect();
        const overlayRect = overlayEle.getBoundingClientRect();
        const anchorRect = this.anchorDomRect;

        const bottomOffset =
            this.offsetObj && this.offsetObj.bottom ? this.offsetObj.bottom : 0;
        const rightOffset =
            this.offsetObj && this.offsetObj.right ? this.offsetObj.right : 0;

        if (anchorRect) {
            const { top, left } = getModalPosition(
                anchorRect,
                contentRect,
                this.position as Positions
            );

            const rightOverflow =
                left + contentRect.width + rightOffset > overlayRect.width;
            const bottomOverflow =
                top + contentRect.height + bottomOffset > overlayRect.height;

            const positionObj: any = {
                ...(rightOverflow
                    ? rightOffset
                        ? {
                              left: `${
                                  overlayRect.width -
                                  contentRect.left -
                                  rightOffset
                              }px`,
                          }
                        : {
                              right: 0,
                          }
                    : {
                          left: `${left}px`,
                      }),
                ...(bottomOverflow
                    ? bottomOffset
                        ? {
                              top: `${
                                  overlayRect.height -
                                  contentRect.height -
                                  bottomOffset
                              }px`,
                          }
                        : {
                              bottom: 0,
                          }
                    : {
                          top: `${top}px`,
                      }),
            };

            Object.keys(positionObj).forEach((item: string) => {
                this.renderer.setStyle(contentEle, item, positionObj[item]);
            });
        }
        this.renderer.addClass(contentEle, 'visible');
    }

    onOverlayClick(event: Event) {
        event?.stopPropagation();

        if (this.documentClickListener) {
            this.documentClickListener();
        }

        if (this.closeCb.observed) {
            this.closeCb.emit(event);
        }
    }

    onScroll(event: any) {
        event?.stopPropagation();

        if (this.documentWheelListener) {
            this.documentWheelListener();
        }

        if (this.scrollCb.observed) {
            this.scrollCb.emit(event);
        }
    }
}
