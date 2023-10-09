import {
    ApplicationRef,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    Injectable,
    Injector,
} from '@angular/core';
import { ToastComponent } from './toast/toast.component';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    componentRef: any = null;
    timeout = 5;
    timer: any;

    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    showToast(options: any): void {
        if (this.componentRef) {
            if (this.timer) {
                this.componentRef.instance.toastStyles.transform = '';
                window.clearTimeout(this.timer);
            }
            setTimeout(() => {
                this.createInstance(options);
            }, 100);
        } else {
            this.createInstance(options);
        }
    }

    createInstance(options: any): void {
        this.destroyInstance();
        if (this.componentRef === null) {
            const componentFactory =
                this.componentFactoryResolver.resolveComponentFactory(
                    ToastComponent
                );

            this.componentRef = componentFactory.create(this.injector);

            this.appRef.attachView(this.componentRef.hostView);
            const [toastDOMElement] = (
                this.componentRef.hostView as EmbeddedViewRef<any>
            ).rootNodes;

            this.setToastComponentProperties(options);
            document.body.appendChild(toastDOMElement);
        }
    }

    setToastComponentProperties(options: any): void {
        if (this.componentRef !== null) {
            const isDesktop = window.innerWidth > 768;
            if (isDesktop) {
                if (!options.position) {
                    this.componentRef.instance.position = 'bottom-left';
                }

                this.componentRef.instance.toastStyles.minWidth = '350px';
                this.componentRef.instance.toastStyles.maxWidth = '500px';
            } else {
                if (!options.position) {
                    this.componentRef.instance.position = 'bottom-center';
                }

                this.componentRef.instance.toastStyles.minWidth =
                    window.innerWidth < 390
                        ? window.innerWidth - 40 + 'px'
                        : '350px';
                this.componentRef.instance.toastStyles.maxWidth =
                    window.innerWidth < 540
                        ? window.innerWidth - 40 + 'px'
                        : '500px';
            }

            this.componentRef.instance.toastStyles.transform = 'translateX(0)';

            this.componentRef.instance.title = options.title || '';
            this.componentRef.instance.description = options.description || '';
            this.componentRef.instance.kindIconMap = options.kind || 'default';

            this.timer = setTimeout(() => {
                this.destroyInstance();
            }, this.timeout * 1000);
        }
    }
   
    destroyInstance(): void {
        if (this.componentRef) {
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
