import { AfterContentInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { pairwise } from 'rxjs';
import { JctServicesService } from '../../../components/common/services/jctservices.service';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { KycServicePopupComponent } from 'src/app/modules/services-root/kyc-root/kyc-service-popup/kyc-service-popup.component'
import { TermsConditionPopupComponent } from '../kyc-root/terms-condition-popup/terms-condition-popup.component';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { JctMisscallService } from 'src/app/components/common/services/jctmisscall.service';
import { JctSmsService } from 'src/app/components/common/services/jctsms.service';

@Component({
  selector: 'app-jctservices',
  templateUrl: './jctservices.component.html',
  styleUrls: ['./jctservices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JctservicesComponent implements OnInit, AfterContentInit {
  @Input() menuList: any;
  subMenuList: any[] = [];
  callvariable: boolean = false;
  selectedItem: string = "Automated-Outbound-Call";
  stage: number = 0;
  menuexpand: boolean = false;
  contactElement: any = {
    subname: "contacts",
    subroute: "/landing/services/manage-contact"
  };
  audioElement: any = {
    subname: "audio-messages",
    subroute: "/landing/services/audio"
  };
  campaignElement: any = {
    subname: "campaigns",
    subroute: "/landing/services/campaign-table"
  };;
  gettingStartElement: any = {
    subname: "getting-started",
    subroute: "/landing/services/welcome"
  };


  constructor(
    private router: Router,
    public jctSer: JctServicesService,
    private dialogSer: DialogService, private misscallservice: JctMisscallService,
    private smscampservice: JctSmsService,
    private toastSer: ToastService
  ) {
    this.jctSer.subselectedItem = "";
    this.menuList = JSON.parse(JSON.stringify(this.jctSer.menuList));
  }

  ngOnInit(): void {
    let flagtest: string = window.history.state?.CampFlag;
    if (flagtest === 'P') {
      this.jctSer.subselectedItem = 'Missed-call';
    } else if (flagtest === 'G') {
      this.jctSer.subselectedItem = 'getting-started-missed-call';
    } else if (flagtest === 'A') {
      this.jctSer.subselectedItem = 'campaigns';

    }
    const handleBackTrigger = (event: any) => {
      this.jctSer.backTrackFlag = event.detail;
    };
    window.addEventListener('backTrackNavigation', handleBackTrigger);

    this.menuList = JSON.parse(JSON.stringify(this.jctSer.menuList));
    this.jctSer.journeyId = '';
    this.kycStatus();
    this.misscallGettingstarted();
    this.SMSCampGettingstarted();
    this.getOnboarding();
    this.jctSer.startCountChange.pipe(pairwise()).subscribe(([previous, current]) => {

      if (previous != current) {
        let count = current;
        this.stage = count;
        this.menuList = JSON.parse(JSON.stringify(this.jctSer.menuList));
        this.menuList[0].subMenuList[0].subDisplayName = "Getting Started";
        this.selectedItem = "Automated-Outbound-Call";
        if (this.stage == 3) {
          this.menuList[0].subMenuList = this.menuList[0].subMenuList.filter((item: any) => item.subname !== 'getting-started');
          if (!this.jctSer.backTrackFlag?.key) {
            this.jctSer.startMenuChange.next(this.campaignElement);
          } else {
            this.router.navigateByUrl(this.jctSer.backTrackFlag?.value?.services);
          }

        }
        this.menuexpand = true;
      }
    });

    this.jctSer.startMenuChange.pipe(pairwise()).subscribe(([previous, current]) => {
      if (previous != current) {
        if (previous.subname == "getting-started-missed-call") {
          this.misscallGettingstarted();
        }
        if (this.misscallservice.missedcallStarted) {
          this.menuList[2].subMenuList = this.menuList[2].subMenuList.filter((item: any) => item.subname !== 'getting-started-missed-call');
        }
        if (previous.subname == "getting-sms") {
          this.SMSCampGettingstarted();
        }

        if (this.smscampservice.smsStarted) {
          this.menuList[1].subMenuList = this.menuList[1].subMenuList.filter((item: any) => item.subname !== 'getting-sms');
        }
      }
    });



    const handleAuthorize = (event: any) => {
      this.jctSer.authDetails = event.detail;
    };
    window.addEventListener('AuthorizeDetails', handleAuthorize);

  }

  getOnboarding() {
    let journeyId = '';
    this.jctSer.getOnboarding(journeyId).subscribe((onboard: any) => {
      if (onboard.status == 'Success') {
        this.stage = onboard?.result ? onboard?.result[0]?.status : '0';
        this.menuList[0].subMenuList[0].subDisplayName = "Getting Started";

        if (this.stage == 3) {
          this.menuList[0].subMenuList = this.menuList[0].subMenuList.filter((item: any) => item.subname !== 'getting-started');
          if (!window.history.state.noRedirect) {
            if (!this.jctSer.backTrackFlag?.key) {
              this.jctSer.startMenuChange.next(this.campaignElement);
            } else {
              this.checkBackOption();
              this.router.navigateByUrl(this.jctSer.backTrackFlag?.value?.services);
            }
          }

        } else {
          if (!window.history.state.noRedirect) {
            if (!this.jctSer.backTrackFlag?.key) {
              this.jctSer.startMenuChange.next(this.gettingStartElement);
            } else {
              this.checkBackOption();
              this.router.navigateByUrl(this.jctSer.backTrackFlag?.value?.services);
            }

          }

        }
      }
    });
  }

  kycStatus() {
    let payload = {};
    this.jctSer.kycStatusApi(payload).subscribe((res: any) => {
      if (res?.result) {
        this.jctSer.preKycFlag = res.result[0].kyc;
        this.jctSer.indeminityFlag = res.result[0].indeminity;
        this.jctSer.proceedDone = res.result[0].tandc;
        if (!this.jctSer.preKycFlag) {
          if (this.jctSer.proceedDone) {
            this.KycServicePopUp();
          } else {
            this.TermsCondtionPopUP();
          }
        }
      }
      else {
        this.jctSer.preKycFlag = false;
        this.jctSer.proceedDone = false;
        if (this.jctSer.proceedDone) {
          this.KycServicePopUp();
        } else {
          this.TermsCondtionPopUP();
        }
        this.toastSer.showToast({ 'title': "No data found", 'kind': 'error' });
      }
    },
      (err: any) => {
        this.toastSer.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )

  }
  toggle(index: number) {
    this.menuList[index].active = !this.menuList[index].active;
  }
  ngAfterContentInit() {
    this.menuList = JSON.parse(JSON.stringify(this.jctSer.menuList));
  }

  gotoMenuLink(menuItem: any): void {
    this.selectedItem = menuItem.name;
  }

  gotoSubMenuLink(submenuItem: any): void {
    if (submenuItem.subroute) {
      this.router.navigateByUrl(submenuItem.subroute);
    }
    this.jctSer.startMenuChange.next(submenuItem);
  }
  KycServicePopUp() {
    this.dialogSer.open(KycServicePopupComponent, {
      data: {
        type: event,
      },
      sidebarPosition: 'center',
      width: '784px',
      close: (reason: any) => {
        if (reason) {
          if (reason === 'skip') {
            // skip KYC button press remain on same page
          }
          else {
            // proceed with KYC button pressed
            this.router.navigateByUrl('/landing/settings/kyc');
          }
        }
        else {
        }
      },
    });
  }
  TermsCondtionPopUP() {
    this.dialogSer.open(TermsConditionPopupComponent, {
      data: {
        type: event,
      },
      sidebarPosition: 'center',
      width: '784px',
      close: (reason: any) => {
        if (reason === 'successTerm') {
          this.proceedTermCondtionSave();
        }
      },
    });
  }
  proceedTermCondtionSave() {
    let payload = {
      tandc: "true"
    }
    this.jctSer.TermcondtionSave(payload).subscribe((res: any) => {
      if (res?.status === 'Success') {
        this.KycServicePopUp();
      }
      else {
        this.toastSer.showToast({ 'title': "Something went wrong", 'kind': 'error' });
      }

    },
      (err: any) => {
        this.toastSer.showToast({ 'title': err?.error?.message, 'kind': 'error' });
      }
    )

  }
  misscallGettingstarted() {
    let journeyid = '';
    this.misscallservice.getOnboardingDetail(journeyid).subscribe(
      (result: any) => {
        if (result.status === 'Success' && result?.result) {
          if (result?.result[0]?.status === 'submitted') {
            this.misscallservice.missedcallStarted = true;
            this.menuList[2].subMenuList = this.menuList[2].subMenuList.filter((item: any) => item.subname !== 'getting-started-missed-call');
          } else {
            this.misscallservice.missedcallStarted = false;
          }

        }

      }
    );
  }

  SMSCampGettingstarted() {
    let journeyid = '';
    this.smscampservice.getOnboardingSMSCampDetail(journeyid).subscribe(
      (result: any) => {
        if (result.status === 'Success' && result?.result) {
          if (result?.result?.campaignStatus !== 'DRAFT') {
            this.smscampservice.smsStarted = true;
            this.menuList[1].subMenuList = this.menuList[1].subMenuList.filter((item: any) => item.subname !== 'getting-sms');
          } else {
            this.smscampservice.smsStarted = false;
          }

        }

      }
    );
  }

  checkBackOption() {
    this.jctSer.arrayToexpand = [];
    let menuData: any = this.filterMenus(
      this.jctSer.menuList,
      this.jctSer.backTrackFlag?.value?.services
    );
    let filterMenuData: any = menuData.filter((o: any) => o.subMenuList.length > 0);
    if (filterMenuData?.length > 0) {
      this.jctSer.arrayToexpand.push({ key: true, value: filterMenuData[0]?.menuid });
    }
  }


  filterMenus(arr: any, name: any) {
    return arr.map((obj: any) => {
      return {
        ...obj,
        "subMenuList": obj.subMenuList.filter((menu: any) => menu.subroute === name)
      };
    });
  }
}