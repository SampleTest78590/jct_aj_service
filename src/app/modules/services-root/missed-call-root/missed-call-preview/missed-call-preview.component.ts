import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { SetupFeedackSmsComponent } from '../setup-feedack-sms/setup-feedack-sms.component';
import { NameCampaignModalComponent } from '../name-campaign-modal/name-campaign-modal.component';
import { VirtualNumberModalComponent } from '../virtual-number-modal/virtual-number-modal.component';
import { LeadListActionComponent } from '../lead-list-action/lead-list-action.component';
import { SmsConfigurePopupComponent } from '../sms-template-landing/sms-configure-popup/sms-configure-popup.component';
import { PlusAudioModalComponent } from '../plus-audio-modal/plus-audio-modal.component';

@Component({
  selector: 'app-missed-call-preview',
  templateUrl: './missed-call-preview.component.html',
  styleUrls: ['./missed-call-preview.component.scss']
})
export class MissedCallPreviewComponent implements OnInit {
  readMore: boolean = false;
  readMoreText = 'Read More';
  constructor(private dialogSer: DialogService) { }

  ngOnInit(): void {
  }

  openSetup() {
    let dialogRefAudio = this.dialogSer.open(SetupFeedackSmsComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      // data: {
      //   flag: true,
      //   journeyId: this.welcomservice.journeyId,
      // },
    });
    // this.dialogSer.afterClosed().subscribe((val: any) => {
    //   if (val) {
    //     this.getOnboarding();
    //     this.route.navigateByUrl('/landing/services/audio');
    //   }
    // });
  }
  openNameCampaign() {
    let dialogRefAudio = this.dialogSer.open(NameCampaignModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      // data: {
      //   flag: true,
      //   journeyId: this.welcomservice.journeyId,
      // },
    });
    // this.dialogSer.afterClosed().subscribe((val: any) => {
    //   if (val) {
    //     this.getOnboarding();
    //     this.route.navigateByUrl('/landing/services/audio');
    //   }
    // });
  }

  openVirtualNumbers() {
    let dialogRefAudio = this.dialogSer.open(VirtualNumberModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '540px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      // data: {
      //   flag: true,
      //   journeyId: this.welcomservice.journeyId,
      // },
    });
    // this.dialogSer.afterClosed().subscribe((val: any) => {
    //   if (val) {
    //     this.getOnboarding();
    //     this.route.navigateByUrl('/landing/services/audio');
    //   }
    // });
  }

  leadlistAction() {
    let dialogRefAudio = this.dialogSer.open(LeadListActionComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      // data: {
      //   flag: true,
      //   journeyId: this.welcomservice.journeyId,
      // },
    });
    // this.dialogSer.afterClosed().subscribe((val: any) => {
    //   if (val) {
    //     this.getOnboarding();
    //     this.route.navigateByUrl('/landing/services/audio');
    //   }
    // });
  }
  smsConfigure() {
    this.dialogSer.open(SmsConfigurePopupComponent, {
      data: {
        header: 'Configure your SMS settings',
        subheader: 'To Add Feedback SMS, You need to enter DLT approved Entity ID, Sender ID(s) & SMS Template(s).',

        buttonText: 'Configure now',

        type: event,
      },
      sidebarPosition: 'center',
      width: '384px',
      close: (data: any) => {
        if (data) {

          this.dialogSer.close();
        }
      },
    })
  }

  openPlusAudio() {
    let dialogRefAudio = this.dialogSer.open(PlusAudioModalComponent, {
      panelClass: 'rtl-dialog-box',
      width: '590px',
      height: '100vh',
      autoFocus: false,
      position: { right: '0' },
      animation: { to: 'left' },
      // data: {
      //   flag: true,
      //   journeyId: this.welcomservice.journeyId,
      // },
    });
  }

  readMoreClick(){
    this.readMore= true;
    this.readMoreText = 'Read More' ? 'Read Less' : '';
  }

}
