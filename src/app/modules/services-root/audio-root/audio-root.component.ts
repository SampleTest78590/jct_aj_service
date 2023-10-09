import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { JctServicesService } from 'src/app/components/common/services/jctservices.service';
import { ToastService } from 'src/app/components/common/shared/custom-elements/custom-toast/toast-service.service';
import { MenuItemInterface } from 'src/app/models/menu.models';
@Component({
  selector: 'app-audio-root',
  templateUrl: './audio-root.component.html',
  styleUrls: ['./audio-root.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'full-height'}
})
export class AudioRootComponent implements OnInit {
  subscription: Subscription;
  displayedColumns: string[] = [
    'checkBox',
    'fileName',
    'format',
    'fileSize',
    'playAudio',
    'uploadedBy',
    'dateCreated',
    'action',
  ];
  isselectAll = false;
  sortingDirections: any = {
    fileName: 'asc',
    dateCreated: 'asc',
  };

  ELEMENT_DATA: any = [];

  dataSource = this.ELEMENT_DATA;
  pageEvent: any;
  pageIndex: number = 1;
  pageSize: number = 7;
  total: number;

  fileFormat: any;
  baseSrc: any;
  srcFlag: boolean = false;
  audioIdflag: boolean = false;
  audioFile: any;
  searchValue: any = '';
  stagevalue: any;
  isopenAudioModal = false;
  initialflag: boolean = false;
  activeAudio: any;
  menuItems: MenuItemInterface[] = [
    {
        label: "Edit",
        value: 'edit',
        icon: 'assets/images/svg/ico-edit-grey.svg',
    },
    {
        label: "Duplicate",
        value: 'duplicate',
        icon: 'assets/images/svg/ico-duplicate.svg',
    },
    {
        label: "Delete",
        value: 'delete',
        icon: 'assets/images/svg/ico-delete.svg',
    },
  ];
  constructor(
    private service: JctServicesService,
    public toastservice: ToastService
  ) { }
 
  ngOnInit(): void {
    this.getAudioTableData(this.pageIndex, this.pageSize, '');
    if (this.service.stageValue) {
      this.stagevalue = this.service.stageValue;
    }

    this.service.getAudioListObserver.subscribe((res: any) => {
      if (res.result?.dataArr?.length > 0) {
        this.ELEMENT_DATA = res.result?.dataArr;
        this.total = res.result?.count;
        this.ELEMENT_DATA.forEach((element: any, i: number) => {
          element.formatName = element?.fileName
            ?.substr(element?.fileName.lastIndexOf('.') + 1)
            ?.toUpperCase();
          element['binaryCode'] = '';
          element.fileNameFirst = element?.fileName.split('.')[0];
        });
        // this.dataSource = [...this.ELEMENT_DATA];
        this.dataSource = this.ELEMENT_DATA;
      } else {
        if (this.searchValue === '') {
          this.initialflag = true;
        }
        this.ELEMENT_DATA = res.result?.dataArr;
        this.total = res.result?.count;
        this.dataSource = this.ELEMENT_DATA;
        // this.emptyData = new MatTableDataSource([{ empty: "row" }]);
        // this.toastservice.showToast({
        //   title: 'No data found',
        //   kind: 'error',
        // });
      }
    });
  }

  getAudioTableData(pageIndex: any, pageSize: any, searchStr: any) {
    let payload = {
      page: pageIndex,
      limit: pageSize,
      searchStr: searchStr,
    };

    this.subscription = this.service
      .getAudioTableData(payload)
      .subscribe((res: any) => {
        if (res) {
          this.service.getAudioList.next(res);
        }
      }, (error: any) => {
        this.ELEMENT_DATA = [];
        this.total = 0;
        this.dataSource = this.ELEMENT_DATA;
        this.toastservice.showToast({
          title: error?.error.message,
          kind: 'error',
        });
      });
  }
  sortData(sort: any) {
    const data = [...this.ELEMENT_DATA];
    this.dataSource = data.sort((a, b) => {
      let isAsc: boolean = this.sortingDirections[sort] === 'asc';
      isAsc = !isAsc;

      switch (sort) {
        case 'fileName':
          return this.compare(
            a.fileName.toLowerCase(),
            b.fileName.toLowerCase(),
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

  pageEventList(event: any) {
    this.initialflag = false;
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAudioTableData(this.pageIndex, this.pageSize, this.searchValue);
  }

  outputSearch(event: any) {
    this.searchValue = event;
    this.applyFilter(event);
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.initialflag = false;
    if (this.searchValue?.length > 2) {
      this.pageIndex = 1;
      this.pageSize = 7;
      this.getAudioTableData(this.pageIndex, this.pageSize, this.searchValue);
    } else if (this.searchValue?.length == 0) {
      this.pageIndex = 1;
      this.getAudioTableData(this.pageIndex, this.pageSize, this.searchValue);
    }
  }

  getInitials(str: string) {
    const strArr = str?.split(' ');
    let initials = '';
    strArr?.map((item) => {
      initials += item?.trim().substring(0, 1);
    });
    return initials?.toUpperCase().trim();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  closeModal(event: any) {
    if (event) {
      {
        this.pageIndex = 1;
        this.pageSize = 7;
        this.getAudioTableData(this.pageIndex, this.pageSize, this.searchValue);
      }
    }
    this.isopenAudioModal = false;
  }
  findAudio(element: any, index: any) {
    if (element.audioId || index.length == 1) {
      this.baseSrc = {
        audioId: element.audioId,
      };
      this.audioIdflag = true;
      this.service.getAudioData(this.baseSrc).subscribe((response: any) => {
        if (response.result.length == 1) {
          let audioType = element?.formatName == 'MP3' ? 'data:audio/mp3;base64,' : 'data:audio/wav;base64,';
          this.audioIdflag = false;
          this.audioFile =
            audioType +
            this.decoder(response.result[0]?.audioFile?.data);

          this.dataSource.forEach((element: any, i: number) => {
            if (i == index) {
              element['binaryCode'] = this.audioFile;
            } else {
              element['binaryCode'] = '';
            }
          });
        }
      });
    }
  }
  decoder(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  openCreateAudioModal() {
    // if(this.dataSource?.length > 0){
    //   this.dataSource.forEach((element: any, i: number) => {
    //     element['binaryCode'] = '';
    // });
    // }
   
    this.isopenAudioModal = !this.isopenAudioModal;
    // let dialogRef = this.dialog.open(UploadAudioComponent, {
    //   panelClass: 'rtl-dialog-box',
    //   width: '540px',
    //   height: '100vh',
    //   autoFocus: false,
    //   position: { right: '0' },
    //   animation: { to: 'left' },
    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   if (result) {
    //     {
    //       this.pageIndex = 1;
    //       this.pageSize = 7;
    //       this.getAudioTableData(this.pageIndex, this.pageSize, this.searchValue);
    //     }
    //   }
    // });
  }

  getCurrentPage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAudioTableData(event.pageIndex, event.pageSize, this.searchValue);
  }

  backToStart() {
    this.service.startMenuChange.next({
      subname: "getting-started",
      subroute: "/landing/services/welcome"
    });
  }
  SelectAllAudio(data: any) {
    if (data.target.checked) {
      this.isselectAll = true;
      this.ELEMENT_DATA.forEach((element: any) => {
        element.checked = true;
      });
    } else {
      this.isselectAll = false;
      this.ELEMENT_DATA.forEach((element: any) => {
        element.checked = false;
      });
    }
  }

  checkSingleElement(element: any) {
    element.checked = !element.checked;
    let selectedList = [];
    this.ELEMENT_DATA.forEach((element: any) => {
      if (element.checked) {
        selectedList.push(element);
      }
    });
    if (selectedList?.length === this.ELEMENT_DATA?.length) {
      this.isselectAll = true;
    } else {
      this.isselectAll = false;
    }
  }

  stop(event: any) {
    event.stopPropagation();
  }
  // findAudioWelcome(audioId: any) {
  //   let baseSrc = {
  //     audioId: audioId,
  //   };
  //   this.welcomservice.getAudioData(baseSrc).subscribe((response: any) => {
  //     if (response.result.length == 1) {
  //       this.audioData.audioBinaryCode =
  //         'data:audio/mp3;base64,' +
  //         this.welcomeDecoder(response.result[0].audioFile.data);
  //     }
  //   });
  // }
  onShowMoreOptionsSelect(event: any) {
    event.stopPropagation();
    switch (event.value) {
      case 'edit':
          // this.openEditor();
          break;
      case 'delete':
          // this.openDeleteModal();
          break;
      case 'duplicate':
          // this.openDeleteModal();
          break;
    }
}
}
