import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'src/app/components/common/shared/custom-elements/dialog/dialog.service';
import { UploadSingleLeadComponent } from '../upload-single-lead/upload-single-lead.component';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';

@Component({
  selector: 'app-lead-list-details',
  templateUrl: './lead-list-details.component.html',
  styleUrls: ['./lead-list-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'full-height' },
})
export class LeadListDetailsComponent implements OnInit {
  ELEMENT_DATA: any = [];
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number=0;
  searchValue: any = '';
  dataSource:any=[];
  subscription: Subscription;
  leadId: string = '';
  isselectAll = false;
  initialflag: boolean = false;
  leadListData: any;
  leadListName: any = '';
  store:any=[];
  storeData:any=[];
  sortingDirections: any = {
    leadListFirstName: 'asc',
    leadListLastName: 'asc',
    dateCreated: 'asc',
  };
  deafultLead:any = 'false';

  constructor(
    private dialog: DialogService,
    private service: JctServicesService,
    private route: ActivatedRoute,
    private router: Router,
    public toastservice: ToastService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((param: any) => {
      this.leadId = param.leadId;
      this.leadListName = param.leadName;
      this.deafultLead = param.default;
      this.getleadListDeatails(this.pageIndex, this.pageSize, '');
    });
  }
  getleadListDeatails(pageIndex: any, pageSize: any, searchStr: any) {
   this.store=[];
   this.storeData=[];
   this.ELEMENT_DATA=[];
    let payload = {
      leadId: this.leadId,
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    };
    this.subscription = this.service.getLeadListOfContacts(payload).subscribe(
      (res: any) => {
        if (res.status=="Success"){
          this.ELEMENT_DATA = res.result?.dataArr;
          this.total = res.result?.count;
          this.dataSource = this.ELEMENT_DATA;
          if(this.searchValue != ''){
            this.dataSource.filter( (e: any) => {
              if((e.leadFirstName=="" || e.leadFirstName==undefined) || (e.leadLastName=="" || e.leadLastName==undefined)){
              this.store.push(e);
              }
              else{
                this.storeData.push(e);
              }
            })
            this.dataSource=[];
            this.dataSource=[...this.storeData,...this.store]
          }
        }
        else {
          this.ELEMENT_DATA = [];
          this.total = 0;
          this.dataSource = this.ELEMENT_DATA;
          this.toastservice.showToast({ 'title': res.message, 'kind': 'error' });
        }
      },
      (error) => {
        this.ELEMENT_DATA = [];
        this.total = 0;
        this.dataSource = this.ELEMENT_DATA;
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      }
    );
  }
  openSingleLead() {
    // this.isopenNewContact = !this.isopenNewContact;
    let dialogRefLead = this.dialog.open(UploadSingleLeadComponent,{
      data: {
        leadId:this.leadId
      },
      close: (reason: any) => {
        if (reason) {}
      },
      messagePushed:(type: any)=>{
        this.pageIndex = 1;
        this.getleadListDeatails(this.pageIndex, this.pageSize, '');
      } 
    });
  }
  outputSearch(event: any) {
 
    this.searchValue = event;
    this.applyFilter(event);
  }
  applyFilter(event: Event) {
    
    this.initialflag = false;
    if (this.searchValue?.length > 2) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.getleadListDeatails(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.getleadListDeatails(this.pageIndex, this.pageSize, this.searchValue);
    }
  }
  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;
      switch (sort) {
        case 'leadListFirstName':
          return this.compare(
            a.leadFirstName?.toLowerCase(),
            b.leadFirstName?.toLowerCase(),
            isAsc
          );
        case 'leadListLastName':
          return this.compare(
            a.leadLastName?.toLowerCase(),
            b.leadLastName?.toLowerCase(),
            isAsc
          );
        case 'dateCreated':
          return this.sortDate(a.createdOn, b.createdOn, isAsc);
        default:
          return 0;
      }
    });
    this.sortingDirections[sort] === 'asc'
      ? (this.sortingDirections[sort] = 'dsc')
      : (this.sortingDirections[sort] = 'asc');
  }
  compare(a: any, b: any, isAsc: boolean) {
    return (a == b ? 0 : a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  sortDate(a: any, b: any, isAsc: boolean) {
    var dateA = new Date(a).getTime();
    var dateB = new Date(b).getTime();
    return isAsc ? (dateA > dateB ? 1 : -1) : dateB > dateA ? 1 : -1;
  }
  SelectAllContact(data: any) {
    if (data.target.checked) {
      this.isselectAll = true;
      this.dataSource.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      this.isselectAll = false;
      this.dataSource.forEach((element: any) => {
        element.checked = false;
      });
    }
  }

  checkSingleElement(element: any) {
    element.checked = !element.checked;
    let selectedList = [];
    this.dataSource.forEach((element: any) => {
      if (element.checked) {
        selectedList.push(element);
      }
    });
    if (selectedList?.length === this.dataSource?.length) {
      this.isselectAll = true;
    } else {
      this.isselectAll = false;
    }
  }
  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getleadListDeatails(this.pageIndex, this.pageSize, this.searchValue);
  }
  getCurrentPage(event: any) {
    //this.initialflag = false;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getleadListDeatails(event.pageIndex, event.pageSize, this.searchValue);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  navigateToManageContact() {
    let dataRouteUnique: any = this.service.menuList
          .map((o: any) => o.subMenuList)
          .flat(1);
    let currentRoute: any = dataRouteUnique.filter(
      (r: any) => r.subname == this.service.subselectedItem
    );
    if(currentRoute?.length > 0){
      this.router.navigateByUrl(currentRoute[0]?.subroute);
    }
    
  }

}
