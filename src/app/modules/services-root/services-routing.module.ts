import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { AudioRootComponent } from './audio-root/audio-root.component';
import { CampaignRootComponent } from './campaign-root/campaign-root.component';
import { JctservicesComponent } from './jctservices/jctservices.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CampaingTableListComponent } from './campaing-table-list/campaing-table-list.component';
import { KycServicePopupComponent } from './kyc-root/kyc-service-popup/kyc-service-popup.component';
import { SmsCampRootComponent } from './sms-camp-root/sms-camp-root.component';
import { SmsCampMgmtComponent } from './sms-camp-root/sms-camp-mgmt/sms-camp-mgmt.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '',
    component: JctservicesComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'welcome',
        component: WelcomePageComponent,
      },
      {
        path: 'manage-contact',
        component: ManageContactComponent,
      },
      {
        path: 'manage-contact',
        loadChildren: () =>
          import('./manage-contact/manage-contact.module').then(
            (m) => m.ManageContactModule
          ),
      },
      {
        path: 'audio',
        component: AudioRootComponent,
      },
      {
        path: 'campaign',
        component: CampaignRootComponent,
      },
      {
        path: 'campaign-table',
        component: CampaingTableListComponent,
      },
      {
        path: 'kyc-service',
        component: KycServicePopupComponent,
      },
      {
        path: 'getting-sms',
        component: SmsCampRootComponent,
      },
      {
        path: 'getting-sms-prev',
        component: SmsCampRootComponent,
      },
      {
        path: 'sms-management',
        component: SmsCampMgmtComponent,
      },
      {
        path: 'sms-report',
        loadChildren: () =>
          import('./sms-camp-root/sms-reports-root/sms-reports-root.module').then(
            (m) => m.MissedReportsRootModule
          ),
      },
      {
        path: 'campaign-report',
        loadChildren: () =>
          import('./campaing-table-list/campaign-table-list.module').then(
            (m) => m.CampaignTableListModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./missed-call-root/missed-call.module').then(
            (m) => m.MissedCallModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule { }
