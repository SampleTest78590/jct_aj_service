import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NumericCodeComponent } from './numeric-code/numeric-code.component';
import { TooltipModule } from './custom-tooltip/tooltip.module';
import { MoveInViewportModule } from './move-in-viewport/move-in-viewport.module';
import { ToastComponent } from './custom-toast/toast/toast.component';
import { CustomMenuBlockComponent } from './custom-menu-block/custom-menu-block.component';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { CustomAccordionComponent } from './custom-accordion/custom-accordion.component';
import { SidebarPanelComponent } from './sidebar-panel/sidebar-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCalendarModule } from './custom-calendar/custom-calendar.module';
import { DialogComponent } from './dialog/dialog.component';
import { CustomMesasgeModalComponent } from './custom-message-modal/custom-message-modal.component';
import { CustomPaginationComponent } from '../custom-pagination/custom-pagination.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropdownDirective } from './directives/dropdown.directive';
import { ConfirmationPopupModule } from './confirmation-popup/confirmation-popup.module';
import { NumberformatDirective } from './directives/number-format.pipes';
import { DialogService } from './dialog/dialog.service';
import { CallsLineChartComponent } from 'src/app/modules/services-root/campaing-table-list/campaign-report/calls-line-chart/calls-line-chart.component';
import { FailedCallsChartComponent } from 'src/app/modules/services-root/campaing-table-list/campaign-report/failed-calls-chart/failed-calls-chart.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    CustomModalComponent,
    DropdownComponent,
    NumericCodeComponent,
    ToastComponent,
    CustomMenuBlockComponent,
    CustomSearchComponent,
    CustomAccordionComponent,
    SidebarPanelComponent, 
    DialogComponent,
    CustomMesasgeModalComponent,
    CustomPaginationComponent,
    DropdownDirective,
    NumberformatDirective,
    CallsLineChartComponent,
    FailedCallsChartComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    MoveInViewportModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCalendarModule,
    FlexLayoutModule,
    ConfirmationPopupModule
  ],
  exports: [
    SpinnerComponent,
    CustomModalComponent,
    DropdownComponent,
    NumericCodeComponent,
    TooltipModule,
    MoveInViewportModule,
    CustomMenuBlockComponent,
    CustomSearchComponent,
    CustomAccordionComponent,
    SidebarPanelComponent,
    CustomCalendarModule, DialogComponent,
    CustomMesasgeModalComponent,
    CustomPaginationComponent,
    DropdownDirective,
    ConfirmationPopupModule,
    NumberformatDirective,
    CallsLineChartComponent,
    FailedCallsChartComponent
  ],
  providers: [DialogService]
})
export class CustomElementsModule { }
