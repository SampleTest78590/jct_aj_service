import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JctServicesService } from '../../services/jctservices.service';
import { JctmissedReportService } from 'src/app/modules/services-root/missed-call-root/missed-reports-root/jctmissed-report.service';
import { JctsmsReportService } from 'src/app/modules/services-root/sms-camp-root/sms-reports-root/jctsms-report.service';

@Component({
  selector: 'app-second-panel',
  templateUrl: './second-panel.component.html',
  styleUrls: ['./second-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SecondPanelComponent implements OnInit, OnChanges {
  @Input() secondPanelData: any;
  expandedTeamId: any = "AutomatedOutboundCall";
  activeItem: string = '';
  constructor(private router: Router, public menuService: JctServicesService, private missedCallReportService: JctmissedReportService, private smsReportService: JctsmsReportService) { }

  ngOnInit(): void {
    // back from browser change
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        let dataRouteUnique: any = this.menuService.menuList
          .map((o: any) => o.subMenuList)
          .flat(1);
        let currentRoute: any = dataRouteUnique.filter(
          (r: any) => r.subroute == event.url
        );
        if (currentRoute?.length == 1) {
          this.menuService.subselectedItem = currentRoute[0].subname;
        }

        let menuData: any = this.filterMenus(
          this.menuService.menuList,
          this.menuService.subselectedItem
        );
        let filterMenuData: any = menuData.filter((o: any) => o.subMenuList.length > 0);
        if (filterMenuData?.length > 0) {
          this.expandedTeamId = filterMenuData[0]?.menuid;
        }
      }
      const handlePreKYc = (event: any) => {
        this.menuService.preKycFlag = event.detail;
      };
      window.addEventListener('Kycdetails', handlePreKYc);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    let menuData: any = this.filterMenus(
      this.menuService.menuList,
      this.menuService.subselectedItem
    );
    let filterMenuData: any = menuData.filter((o: any) => o.subMenuList.length > 0);
    if (filterMenuData?.length > 0) {
      this.expandedTeamId = filterMenuData[0]?.menuid;
    }
    let arr:any = {};
    arr.menuid = this.expandedTeamId;
    this.onTeamClick(arr);
  }

  filterMenus(arr: any, name: any) {
    return arr.map((obj: any) => {
      return {
        ...obj,
        "subMenuList": obj.subMenuList.filter((menu: any) => menu.subname === name)
      };
    });
  }

  onTeamClick(team: any) {
    if (team) {
      this.expandedTeamId = team.menuid;
      let availMenu: any = this.menuService.arrayToexpand.filter((o: any) => o.value.includes(team.menuid))?.length > 0 ? false : true;
      if (availMenu) {
        if (this.menuService.arrayToexpand?.length < 2) {
          this.menuService.arrayToexpand.push({ key: false, value: team.menuid })
        } else {
          let index = this.menuService.arrayToexpand.findIndex((item: any) => !item.key);
          this.menuService.arrayToexpand.splice(index, 1);
          this.menuService.arrayToexpand.push({ key: false, value: team.menuid })
        }
      }

    }
  }

  getSettings(teamSetting: any, subMenuList: any, menuid: any) {
    let serviceChange: any = {};
    let routeActive = subMenuList.filter((v: any) => v.subname == teamSetting.subname);
    if (routeActive.length > 0) {
      serviceChange.subname = routeActive[0]?.subname;
      serviceChange.subroute = routeActive[0]?.subroute;
      this.menuService.startMenuChange.next(serviceChange);
    }
    let checkArray: any = this.menuService.arrayToexpand.filter((o: any) => o.value.includes(menuid?.menuid))?.length > 0 ? false : true;
    if (checkArray) {
      this.menuService.arrayToexpand.push({ key: true, value: menuid?.menuid })
    }
    this.menuService.arrayToexpand.forEach((element: any) => {
      if (element.value == menuid.menuid) {
        element.key = true;
      } else {
        element.key = false;
      }
    });
    if (serviceChange.subname == 'reports') {
      this.missedCallReportService.selectedCampaign = {};
    } else if (serviceChange.subname == 'sms-reports') {
      this.smsReportService.selectedCampaign = {};

    }
  }

  checkExistExpand(menuid: any) {
    let idx = this.menuService.arrayToexpand.findIndex((elem: any) => elem.value === menuid);
    if (idx !== -1) {
      return true;
    } else {
      return false;
    }
  }

  checkExistClassExpand(menuid: any) {
    let menuClass = this.menuService.arrayToexpand.findIndex((elem: any) => elem.key == true && elem.value == menuid);
    if (menuClass !== -1) {
      return true;
    } else {
      return false;
    }
  }

}
