import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
})
export class CustomPaginationComponent implements OnInit, OnChanges {
  currentPage: any = 1;
  lastPage: any = 0;
  shownFirstIndex: any = 1;
  @Input() pageIndex:any = 1;
  @Input() pageSize: any = 10;
  @Input() pageSizeOptions: any = [];
  @Input() total: any = 0;
  @Output() returnPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() {
    this.lastPage = Math.ceil(this.total / this.pageSize);
    this.currentPage = this.pageIndex;

  }
  getInteger() {
    return parseInt(this.pageSize);
  }

  // getCurrentPageAndIndex() {
  //   let shownLastIndex = 0;
  //   if (this.currentPage >= this.lastPage) {
  //     shownLastIndex = this.total;
  //   } else {
  //     shownLastIndex = this.currentPage * this.getInteger();
  //   }
  //   let textToBeShown =
  //     this.shownFirstIndex + '/' + shownLastIndex + ' of ' + this.total;
  //   return textToBeShown;
  // }

  onPageSizeChange() {
    this.lastPage = this.total / this.pageSize;
  }

  onNextPage() {
    this.currentPage++;
    // this.shownFirstIndex += this.getInteger();
    this.returnPage.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  onLastPage() {

    this.currentPage = this.lastPage;

    // for (let index = 0; index < this.lastPage - 1; index++) {
    //   this.shownFirstIndex += this.getInteger();
    // }

    this.returnPage.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  onFirstPage() {
    this.currentPage = 1;
    // this.shownFirstIndex = this.currentPage;
    this.returnPage.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  onPreviousPage() {
    this.currentPage--;
    // this.shownFirstIndex -= this.getInteger();
    this.returnPage.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  // disableLastPage() {
  //   if (this.currentPage >= this.lastPage) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
