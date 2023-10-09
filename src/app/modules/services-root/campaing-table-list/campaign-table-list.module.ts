import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignReportComponent } from './campaign-report/campaign-report.component';
import { CampaignReportTableComponent } from './campaign-report-table/campaign-report-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
// import { FailedCallsChartComponent } from './campaign-report/failed-calls-chart/failed-calls-chart.component';
// import { CallsLineChartComponent } from './campaign-report/calls-line-chart/calls-line-chart.component';
import { AudioPreviewModule } from 'src/app/components/common/shared/audio-preview/audio-preview.module';
import { CustomElementsModule } from 'src/app/components/common/shared/custom-elements/custom-elements.module';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: CampaignReportComponent,
  },
  {
    path: 'report-table',
    component: CampaignReportTableComponent,
  }
]


@NgModule({
  declarations: [
    CampaignReportComponent,
    CampaignReportTableComponent,
    // FailedCallsChartComponent,
    // CallsLineChartComponent,
  ],
  imports: [
    CommonModule, FlexLayoutModule, RouterModule.forChild(routes), AudioPreviewModule, CustomElementsModule, FormsModule
  ]
})
export class CampaignTableListModule { }
