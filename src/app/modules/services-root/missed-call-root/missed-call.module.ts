import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MissedCallRootComponent } from './missed-call-root.component';
import { MissedCallMgnComponent } from './missed-call-mgn/missed-call-mgn.component';
import { NameCampaignModalComponent } from './name-campaign-modal/name-campaign-modal.component';
import { CustomElementsModule } from 'src/app/components/common/shared/custom-elements/custom-elements.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChooseSMSTemplateComponent } from './choose-sms-template/choose-sms-template.component';
import { SenderIdModalComponent } from './sender-id-modal/sender-id-modal.component';
import { SetupFeedackSmsComponent } from './setup-feedack-sms/setup-feedack-sms.component';
import { EntityModalComponent } from './entity-modal/entity-modal.component';
import { VirtualNumberModalComponent } from './virtual-number-modal/virtual-number-modal.component';
import { LeadListActionComponent } from './lead-list-action/lead-list-action.component';
import { CreateNewLeadListComponent } from './lead-list-action/create-new-lead-list/create-new-lead-list.component';
import { SmsTemplateLandingComponent } from './sms-template-landing/sms-template-landing.component';
import { SmsSettingModalComponent } from './sms-template-landing/sms-setting-modal/sms-setting-modal.component';
import { AddNewSmsComponent } from './sms-template-landing/add-new-sms/add-new-sms.component';
import { AudioPreviewModule } from 'src/app/components/common/shared/audio-preview/audio-preview.module';
import { SmsConfigurePopupComponent } from './sms-template-landing/sms-configure-popup/sms-configure-popup.component';
import { MissedCallPreviewComponent } from './missed-call-preview/missed-call-preview.component';
import { RouterModule, Routes } from '@angular/router';
import { AudioRootComponent } from '../audio-root/audio-root.component';
import { ManageContactComponent } from '../manage-contact/manage-contact.component';
import { ManageContactModule } from '../manage-contact/manage-contact.module';
import { MissedReportsRootModule } from './missed-reports-root/missed-reports-root.module';

const routes: Routes = [
  {
    path: 'refresh',
    component: SmsTemplateLandingComponent,
  },
  {
    path: 'missed-call',
    component: MissedCallRootComponent,
  },
  {
    path: 'getting-started',
    component: MissedCallRootComponent,
  },
  {
    path: 'missed-call-mgn',
    component: MissedCallMgnComponent,
  },
  {
    path: 'sms-template',
    component: SmsTemplateLandingComponent,
  },
  {
    path: 'name-cam-modal',
    component: NameCampaignModalComponent,
  },
  {
    path: 'missed-audio',
    component: AudioRootComponent,
  },
  {
    path: 'lead-list',
    component: ManageContactComponent,
  },
  {
    path: 'sms-lead-list',
    component: ManageContactComponent,
  },
  {
    path: 'sms-template-camp',
    component: SmsTemplateLandingComponent,
  },

  {
    path: 'lead-list',
    loadChildren: () =>
      import('./../manage-contact/manage-contact.module').then(
        (m) => m.ManageContactModule
      ),
  },
  {
    path: 'sms-lead-list',
    loadChildren: () =>
      import('./../manage-contact/manage-contact.module').then(
        (m) => m.ManageContactModule
      ),
  },
  {
    path: 'missed-reports',
    loadChildren: () =>
      import('././missed-reports-root/missed-reports-root.module').then((m) => m.MissedReportsRootModule),
  },
]
@NgModule({
  declarations: [
    MissedCallRootComponent,
    MissedCallMgnComponent,
    NameCampaignModalComponent,
    ChooseSMSTemplateComponent,
    SenderIdModalComponent,
    SetupFeedackSmsComponent,
    EntityModalComponent,
    LeadListActionComponent,
    CreateNewLeadListComponent,
    SmsTemplateLandingComponent,
    VirtualNumberModalComponent,
    SmsSettingModalComponent,
    AddNewSmsComponent,
    SmsConfigurePopupComponent,
    MissedCallPreviewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomElementsModule,
    InfiniteScrollModule,
    CustomElementsModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    FlexLayoutModule,
    ScrollingModule,
    AudioPreviewModule,
    ManageContactModule,
    MissedReportsRootModule,
    RouterModule.forChild(routes),
  ],

})
export class MissedCallModule { }
