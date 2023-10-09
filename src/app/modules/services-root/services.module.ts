import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AttachDragDropComponent } from 'src/app/components/common/shared/attach-drag-drop/attach-drag-drop.component';
import { ServicesRoutingModule } from './services-routing.module';
import { BreadcrumbCardComponent } from 'src/app/components/common/shared/breadcrumb-card/breadcrumb-card.component';
import { JctservicesComponent } from './jctservices/jctservices.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { AudioRootComponent } from './audio-root/audio-root.component';
import { CampaignRootComponent } from './campaign-root/campaign-root.component';
import { CampaingTableListComponent } from './campaing-table-list/campaing-table-list.component';
import { CampaignScheduleComponent } from 'src/app/components/common/campaign-schedule/campaign-schedule.component';
import { CreateCampaignComponent } from 'src/app/components/common/create-campaign/create-campaign.component';
import { TestCampaignModalComponent } from 'src/app/components/common/test-campaign-modal/test-campaign-modal.component';
import { UploadAudioComponent } from 'src/app/components/common/upload-audio/upload-audio.component';
import { UploadLeadListComponent } from 'src/app/components/common/upload-lead-list/upload-lead-list.component';
import { CustomElementsModule } from 'src/app/components/common/shared/custom-elements/custom-elements.module';
import { LeadListPreviewComponent } from 'src/app/components/common/lead-list-preview/lead-list-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExpanedCollapseComponent } from 'src/app/components/common/shared/expaned-collapse/expaned-collapse.component';
import { ItemBlockComponent } from 'src/app/components/common/shared/second-panel/item-block/item-block.component';
import { SecondPanelComponent } from 'src/app/components/common/shared/second-panel/second-panel.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AudioPreviewModule } from 'src/app/components/common/shared/audio-preview/audio-preview.module';
import { DestinationNumberComponent } from 'src/app/components/common/campaign-schedule/destination-number/destination-number.component';
import { KycServicePopupComponent } from './kyc-root/kyc-service-popup/kyc-service-popup.component';
import { TermsConditionPopupComponent } from './kyc-root/terms-condition-popup/terms-condition-popup.component';
import { PlusAudioModalComponent } from './missed-call-root/plus-audio-modal/plus-audio-modal.component';
import { SmsCampRootComponent } from './sms-camp-root/sms-camp-root.component';
import { SmsCampMgmtComponent } from './sms-camp-root/sms-camp-mgmt/sms-camp-mgmt.component';
import { ChooseSmsLeadListComponent } from './sms-camp-root/choose-sms-lead-list/choose-sms-lead-list.component';
import { SetupSmsCampModalComponent } from './sms-camp-root/setup-sms-camp-modal/setup-sms-camp-modal.component';
import { UploadLeadListSmsComponent } from './sms-camp-root/upload-lead-list-sms/upload-lead-list-sms.component'
import { SMSTestCampaignComponent } from './sms-camp-root/test-campaign-modal/test-campaign-modal.component';
@NgModule({
  declarations: [
    AttachDragDropComponent,
    BreadcrumbCardComponent,
    JctservicesComponent,
    WelcomePageComponent,
    ManageContactComponent,
    AudioRootComponent,
    CampaignRootComponent,
    CampaingTableListComponent,
    CampaignScheduleComponent,
    CreateCampaignComponent,
    TestCampaignModalComponent,
    UploadAudioComponent,
    UploadLeadListComponent,
    LeadListPreviewComponent,
    SecondPanelComponent,
    ItemBlockComponent,
    ExpanedCollapseComponent,
    DestinationNumberComponent,
    KycServicePopupComponent,
    TermsConditionPopupComponent,
    PlusAudioModalComponent,
    SmsCampRootComponent,
    SmsCampMgmtComponent,
    ChooseSmsLeadListComponent,
    SetupSmsCampModalComponent,
    UploadLeadListSmsComponent,
    SMSTestCampaignComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ServicesRoutingModule,
    InfiniteScrollModule,
    CustomElementsModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    FlexLayoutModule, ScrollingModule, AudioPreviewModule
  ],
})
export class ServicesModule { }
