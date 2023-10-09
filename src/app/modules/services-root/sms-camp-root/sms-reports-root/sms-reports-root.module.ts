import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomElementsModule } from 'src/app/components/common/shared/custom-elements/custom-elements.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AudioPreviewModule } from 'src/app/components/common/shared/audio-preview/audio-preview.module';
import { RouterModule, Routes } from '@angular/router';
import { SMSChartBarComponent } from './sms-chart-bar/sms-chart-bar.component';
import { SMSOtherStatsComponent } from './sms-other-stats/sms-other-stats.component';
import { SMSReportsDetailsComponent } from './sms-reports-details/sms-reports-details.component';
import { NumberCellsSectionComponent } from './number-cells-section/number-cells-section.component';
import { NumberSmsSectionComponent } from './number-sms-section/number-sms-section.component';
import { SmsChartComponent } from './sms-chart/sms-chart.component';
import { VirtualSectionComponent } from './virtual-section/virtual-section.component';
import { SMSReportsRootComponent } from './sms-reports-root.component';


const routes: Routes = [
  {
    path: '',
    component: SMSReportsRootComponent,
  },
  {
    path: 'reports-landing',
    component: SMSReportsRootComponent,
  },
  {
    path: 'reports-details',
    component: SMSReportsDetailsComponent,
  },

]


@NgModule({
  declarations: [
    SMSReportsRootComponent,
    SMSChartBarComponent,
    SMSOtherStatsComponent,
    SMSReportsDetailsComponent,
    NumberCellsSectionComponent,
    NumberSmsSectionComponent,
    SmsChartComponent, VirtualSectionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomElementsModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    FlexLayoutModule,
    ScrollingModule,
    AudioPreviewModule,
    RouterModule.forChild(routes),
  ]
})
export class MissedReportsRootModule { }
