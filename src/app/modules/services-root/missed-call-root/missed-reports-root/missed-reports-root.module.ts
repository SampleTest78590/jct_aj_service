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
import { MissedChartBarComponent } from './missed-chart-bar/missed-chart-bar.component';
import { MissedOtherStatsComponent } from './missed-other-stats/missed-other-stats.component';
import { MissedReportsDetailsComponent } from './missed-reports-details/missed-reports-details.component';
import { NumberCellsSectionComponent } from './number-cells-section/number-cells-section.component';
import { NumberSmsSectionComponent } from './number-sms-section/number-sms-section.component';
import { SmsChartComponent } from './sms-chart/sms-chart.component';
import { VirtualSectionComponent } from './virtual-section/virtual-section.component';
import { MissedReportsRootComponent } from './missed-reports-root.component';


const routes: Routes = [
  {
    path: '',
    component: MissedReportsRootComponent,
  },
  {
    path: 'reports-landing',
    component: MissedReportsRootComponent,
  },
  {
    path: 'reports-details',
    component: MissedReportsDetailsComponent,
  },

]


@NgModule({
  declarations: [
    MissedReportsRootComponent,
    MissedChartBarComponent,
    MissedOtherStatsComponent,
    MissedReportsDetailsComponent,
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
